import { useState, useEffect } from 'react';

const Calculator = () => {
  const [meters, setMeters] = useState(1);
  const [years, setYears] = useState(15);
  const [price, setPrice] = useState(7125000);
  const [appreciation, setAppreciation] = useState(8.0);
  const [inflation, setInflation] = useState(5.0);
  const [rentPerMonth, setRentPerMonth] = useState(23300);
  const [appreciationPerYear, setAppreciationPerYear] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);

  const rentPerTerm = (rentPerMonth * (((Math.pow(1 + inflation / 12 / 100, years * 12) - 1) / (inflation / 12 / 100)) * (1 + inflation / 12 / 100)) * meters);
  const totalEarnings = price * meters * (1 + appreciation / 100) ** years;

  const centsToCurrency = (cents) => {
    return (cents / 100).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
  }

  const incrementMeters = () => {
    setMeters(meters + 1);
  }

  const decrementMeters = () => {
    if (meters <= 0) return alert('No puedes tener menos de 0 metros cuadrados');
    setMeters(meters - 1);
  }

  const incrementYears = () => {
    setYears(years + 1);
  }

  const decrementYears = () => {
    if (years <= 0) return alert('No puedes tener menos de 0 años');
    setYears(years - 1);
  }

  const calculateAppreciation = () => {
    let appreciationPerYear = [];
    for (let i = 1; i <= years; i++) {
      const pricePerMeter = price * (1 + appreciation / 100) ** i;
      const totalPrice = pricePerMeter * meters;
      const totalAppreciation = totalPrice - (price * meters);
      
      appreciationPerYear.push({
        year: i,
        price: totalPrice,
        appreciation: totalAppreciation
      });
    }
    setAppreciationPerYear(appreciationPerYear);
  }

  useEffect(() => {
    calculateAppreciation();
  }, [years, meters]);

  return (
    <div>
      <div className="gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-start gap-8">
          <img src="/logo-nav.png" alt="Logo" className="w-auto h-5 md:h-8" />
          <div>
            <h1 className="text-xl md:text-2xl">Conoce cuanto puede crecer tu patrimonio si inviertes en <strong>Vitant® Del Valle</strong></h1>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <p className="text-balance text-sm md:text-lg">¿Cuántos m² quieres comprar?</p>
            <div className="flex items-center gap-4 w-full">
              <button className="flex justify-center items-center bg-white border rounded-full size-10" onClick={decrementMeters} disabled={meters <= 1}>
                -
              </button>
              <div className="flex items-center gap-1 text-2xl">
                <input type="number" className="text-right bg-transparent w-[3ch] font-bold" value={meters} readOnly />
                <span>m²</span>
              </div>
              <button className="flex justify-center items-center bg-white border rounded-full size-10"   onClick={incrementMeters}>
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <p className="text-balance text-sm md:text-lg">¿Por cuántos años los quisieras conservar?</p>
            <div className="flex items-center gap-4">
              <button className="flex justify-center items-center bg-white border rounded-full size-10" onClick={decrementYears} disabled={years <= 1} >
                -
              </button>
              <div className="flex items-center gap-1 text-2xl">
                <input type="number" className="text-right bg-transparent w-[3ch] font-bold" readOnly value={years} />
                <span>años</span>
              </div>
              <button className="flex justify-center items-center bg-white border rounded-full size-10" onClick={incrementYears}>
                +
              </button>
            </div>
          </div>
          <div className="py-4 border-t w-full">
            <p>Por estos m² pagarías:</p>
            <strong>{centsToCurrency(price*meters)} pesos mexicanos</strong>
          </div>
        </div>
        <div className="flex flex-col gap-8 bg-white shadow-sm p-4 md:p-8 border">
          <div className="flex flex-col gap-4">
            <p className="text-base md:text-lg">
              Con una plusvalía aproximada del <strong>{appreciation}%</strong> anual,
              tus metros valdrían en <strong>{years}</strong> años:</p>
            <div>
              <p className="font-semibold text-3xl">
                <span>{centsToCurrency(totalEarnings)} pesos</span>
              </p>
              <p className="text-base text-primary md:text-lg">Un incremento de {centsToCurrency(totalEarnings - price*meters)} pesos</p>
            </div>
            <button className="text-left text-primary text-sm underline" onClick={() => setViewDetail(!viewDetail)}>
              {viewDetail ? 'Ocultar detalle' : 'Ver detalle'}
            </button>
            {viewDetail && (
              <div className="md:h-64 md:overflow-scroll">
                <table className="border-collapse border w-full">
                  <thead className="bg-beige border-b text-sm">
                    <th className="p-2 text-left">Año</th>
                    <th className="text-right p-2">Precio m²</th>
                    <th className="text-right p-2">Plusvalía</th>
                  </thead>
                  <tbody className="font-mono text-sm">
                    {appreciationPerYear.map((item) => (
                      <tr key={item.year} className="border-b">
                        <td className="p-2 text-left">{item.year}</td>
                        <td className="text-right p-2">{centsToCurrency(item.price)}</td>
                        <td className="text-right p-2">{centsToCurrency(item.appreciation)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base md:text-lg">Y ganarías en rentas en {years} años:</p>
            <div>
              <p className="font-semibold text-3xl">{centsToCurrency(rentPerTerm)} pesos</p>
              <p className="text-base text-primary md:text-lg">{centsToCurrency((rentPerTerm/years))} de renta anual.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-beige border divide-y text-base">
            <p className='p-2'>En total ganarias: {centsToCurrency((totalEarnings - price*meters) + rentPerTerm)} pesos</p>
            <p className='p-2'>en todo momento eres dueño de tus m²</p>
            <p className='p-2'>Puedes comprar más m² y canjearlos por otros proyectos de BeGrand</p>
          </div>
          <div className="flex flex-col gap-4">
            <a className="flex justify-center items-center gap-1 bg-primary p-3 border text-white" href="#">Comenzar a invertir</a>
            <div className='flex justify-center items-center gap-4'>
              <div className='bg-black/10 w-full h-px'></div>
              <span>o</span>
              <div className='bg-black/10 w-full h-px'></div>
            </div>
            <a className="flex justify-center items-center gap-1 bg-white p-3 border text-primary" href="#">Hablar con un asesor</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-8">
        <small>Para el cálculo de renta se considera una estimación de la inflación promedio del 5% por año</small>
        <small className="opacity-70 leading-relaxed">Los rendimientos son ilustrativos y no debe interpretarse como garantía de resultados futuros. Los valores y tendencias del mercado inmobiliario pueden variar y están sujetos a cambios imprevistos que pueden afectar los resultados proyectados</small>
      </div>
    </div>
  );
}

export default Calculator;