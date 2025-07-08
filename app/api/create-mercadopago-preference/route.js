import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', courseId, courseName } = body;

    console.log('Datos recibidos para Mercado Pago:', { amount, currency, courseId, courseName });

    // Validar datos requeridos
    if (!amount || amount <= 0) {
      console.error('Monto inválido:', amount);
      return NextResponse.json(
        { error: 'Monto inválido' },
        { status: 400 }
      );
    }

    if (!courseName) {
      console.error('Nombre del curso requerido');
      return NextResponse.json(
        { error: 'Nombre del curso requerido' },
        { status: 400 }
      );
    }

    // Configurar Mercado Pago
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('MERCADOPAGO_ACCESS_TOKEN no está configurada');
      return NextResponse.json(
        { error: 'Mercado Pago no está configurado. Verifica MERCADOPAGO_ACCESS_TOKEN en .env.local' },
        { status: 500 }
      );
    }

    mercadopago.configure({
      access_token: accessToken,
    });

    // Crear preferencia de Mercado Pago
    const preference = {
      items: [
        {
          title: courseName,
          unit_price: parseFloat(amount),
          quantity: 1,
          currency_id: currency === 'USD' ? 'USD' : 'ARS',
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/pending`,
      },
      auto_return: 'approved',
      external_reference: courseId || courseName.toLowerCase().replace(/\s+/g, '-'),
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/mercadopago`,
    };

    console.log('Creando preferencia de Mercado Pago...');

    const response = await mercadopago.preferences.create(preference);

    console.log('Preferencia creada exitosamente:', response.body.id);

    return NextResponse.json({
      preferenceId: response.body.id,
      initPoint: response.body.init_point,
      sandboxInitPoint: response.body.sandbox_init_point,
    });
  } catch (error) {
    console.error('Error creando preferencia de Mercado Pago:', error);
    return NextResponse.json(
      { error: `Error interno del servidor: ${error.message}` },
      { status: 500 }
    );
  }
} 