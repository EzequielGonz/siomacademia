"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentModal = ({ isOpen, onClose, course, amount }) => {
  const [success, setSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('paypal');
  const [mercadopagoUrl, setMercadopagoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      onClose();
      setSuccess(false);
    }, 3000);
  };

  const createMercadoPagoPreference = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/create-mercadopago-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          courseName: course,
          courseId: course.toLowerCase().replace(/\s+/g, '-'),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creando preferencia de Mercado Pago');
      }

      const data = await response.json();
      setMercadopagoUrl(data.sandboxInitPoint || data.initPoint);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMercadoPagoClick = () => {
    if (!mercadopagoUrl) {
      createMercadoPagoPreference();
    } else {
      window.open(mercadopagoUrl, '_blank');
    }
  };

  const paypalOptions = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
    currency: 'USD',
    intent: 'capture',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1A237E]">
                {success ? '¡Pago Exitoso!' : 'Completar Pago'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1A237E] mb-2">
                  ¡Pago Completado!
                </h3>
                <p className="text-gray-600">
                  Gracias por tu compra. Recibirás un email con los detalles del curso.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Información del curso */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#1A237E] mb-2">{course}</h3>
                  <p className="text-2xl font-bold text-[#FFD700]">${amount}</p>
                </div>

                {/* Selector de método de pago */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-[#1A237E] mb-2">
                    Selecciona tu método de pago:
                  </label>
                  
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={selectedMethod === 'paypal'}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="text-[#1A237E] focus:ring-[#1A237E]"
                      />
                      <span className="text-sm font-medium text-[#1A237E]">PayPal</span>
                      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .653-.352 1.163-.844 1.478-.492.315-1.163.478-1.844.478H18.5c-.681 0-1.352-.163-1.844-.478-.492-.315-.844-.825-.844-1.478 0-.653.352-1.163.844-1.478.492-.315 1.163-.478 1.844-.478h.723c.681 0 1.352.163 1.844.478z"/>
                      </svg>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mercadopago"
                        checked={selectedMethod === 'mercadopago'}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="text-[#1A237E] focus:ring-[#1A237E]"
                      />
                      <span className="text-sm font-medium text-[#1A237E]">Mercado Pago</span>
                      <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </label>
                  </div>
                </div>

                {/* Error display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4"
                  >
                    <p className="text-red-600 text-sm font-semibold mb-2">Error:</p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Método de pago seleccionado */}
                {selectedMethod === 'paypal' && (
                  <div className="space-y-4">
                    <PayPalScriptProvider options={paypalOptions}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: amount.toString(),
                                },
                                description: `Curso: ${course}`,
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            console.log('Pago completado:', details);
                            handleSuccess();
                          });
                        }}
                        onError={(err) => {
                          console.error('Error de PayPal:', err);
                          setError('Error procesando el pago con PayPal');
                        }}
                        style={{ layout: 'vertical' }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}

                {selectedMethod === 'mercadopago' && (
                  <div className="space-y-4">
                    <motion.button
                      onClick={handleMercadoPagoClick}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Pagar con Mercado Pago
                        </>
                      )}
                    </motion.button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      Serás redirigido a Mercado Pago para completar tu pago de forma segura.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal; 