import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('Webhook de Mercado Pago recibido:', body);

    // Verificar el tipo de notificación
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      console.log('Procesando pago:', paymentId);
      
      // Aquí puedes agregar lógica para procesar el pago
      // Por ejemplo, actualizar el estado del curso en tu base de datos
      
      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error) {
    console.error('Error procesando webhook de Mercado Pago:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
} 