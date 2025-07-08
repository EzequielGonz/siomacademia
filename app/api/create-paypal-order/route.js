import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = 'USD', courseId, courseName } = body;

    console.log('Datos recibidos para PayPal:', { amount, currency, courseId, courseName });

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

    // Crear orden de PayPal
    const paypalOrder = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString(),
          },
          description: `Curso: ${courseName}`,
          custom_id: courseId || courseName.toLowerCase().replace(/\s+/g, '-'),
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      },
    };

    console.log('Orden de PayPal creada:', paypalOrder);

    return NextResponse.json({
      order: paypalOrder,
      orderId: `paypal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });
  } catch (error) {
    console.error('Error creando orden de PayPal:', error);
    return NextResponse.json(
      { error: `Error interno del servidor: ${error.message}` },
      { status: 500 }
    );
  }
} 