import { useState, useEffect } from 'react';

const Calculator = () => {
  const [meters, setMeters] = useState(2);
  const [years, setYears] = useState(10);
  const [price, setPrice] = useState(7200000);
  const [appreciation, setAppreciation] = useState(6.6);
  const [rentPerYear, setRentPerYear] = useState(30000);
  const [appreciationPerYear, setAppreciationPerYear] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);

  const rentPerTerm = (rentPerYear *  meters) * years;
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
    <div className="gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col items-start gap-8">
        <img src="/logo-nav.png" alt="Logo" class="w-auto h-5 md:h-8" />
        <div>
          <h1 className="text-xl md:text-2xl">Conoce cuanto puede crecer tu patrimonio si inviertes en <strong>Vitant del Valle</strong></h1>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-balance">Indica cuantos metros cuadrados quieres comprar de este proyecto:</p>
          <div className="flex items-center gap-4">
            <button className="flex justify-center items-center bg-white border rounded-full size-10" onClick={decrementMeters}>
              -
            </button>
            <div className="flex items-center gap-1 text-2xl">
              <input type="number" className="text-right bg-transparent w-[3ch] font-bold" value={meters} readOnly />
              <span>m2</span>
            </div>
            <button className="flex justify-center items-center bg-white border rounded-full size-10"   onClick={incrementMeters}>
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-balance">Indica por cuantos años quisieras conservar tus metros cuadrados:</p>
          <div className="flex items-center gap-4">
            <button className="flex justify-center items-center bg-white border rounded-full size-10" onClick={decrementYears}>
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
        <div className="py-4 border-t">
          <p>Por estos metros pagarías:</p>
          <strong>{centsToCurrency(price*meters)} pesos mexicanos</strong>
        </div>
      </div>
      <div className="flex flex-col gap-8 bg-white shadow-sm p-8 border">
        <div className="flex flex-col gap-2">
          <p>
            Con una plusvalía aproximada del <strong>{appreciation}%</strong> anual,
            tus metros valdrían en <strong>{years}</strong> años:</p>
          <div>
            <p className="font-semibold text-3xl">
              <span>{centsToCurrency(totalEarnings)} pesos</span>
            </p>
            <p className="text-primary">Un incremento de {centsToCurrency(totalEarnings - price*meters)} pesos</p>
          </div>
          <button className="text-left text-primary text-sm underline" onClick={() => setViewDetail(!viewDetail)}>
            {viewDetail ? 'Ocultar detalle' : 'Ver detalle'}
          </button>
          {viewDetail && (
            <div className="md:h-64 md:overflow-scroll">
              <table className="border-collapse border w-full">
                <thead className="bg-beige border-b text-sm">
                  <th className="p-2 text-left">Año</th>
                  <th className="text-right p-2">Precio m2</th>
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
          <p>Y ganarías en rentas en 10 años:</p>
          <div>
            <p className="font-semibold text-3xl">{centsToCurrency(rentPerTerm)} pesos</p>
            <p className="text-primary">{centsToCurrency(rentPerYear*meters)} de renta anual.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p>✅ Además en todo momento eres dueño de tu m2</p>
          <p>✅ Puedes comprar más m2 y canjearlos por otros proyectos de BeGrand</p>
        </div>
        <div className="flex flex-col gap-4">
          <a className="flex justify-center items-center gap-1 bg-primary p-3 border text-white" href="#">Comenzar a invertir</a>
        </div>
      </div>
    </div>
  );
}

export default Calculator;