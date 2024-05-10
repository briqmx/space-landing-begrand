import { useState, useEffect } from 'react';

const PROPERTIES = [
  {
    slug: 'be-grand-reforma',
    name: 'Be Grand® Reforma',
    price: 11250000,
    appreciation: 4.0,
    rentPerMonth: 26000
  },
  {
    slug: 'vitant-del-valle',
    name: 'Vitant® Del Valle',
    price: 7125000,
    appreciation: 4.0,
    rentPerMonth: 22300
  },
  {
    slug: 'vitant-polanco',
    name: 'Vitant® Polanco',
    price: 7225000,
    appreciation: 4.0,
    rentPerMonth: 21100
  },
  {
    slug: 'vitant-santa-fe',
    name: 'Vitant® Santa Fe',
    price: 8175000,
    appreciation: 4.0,
    rentPerMonth: 22000
  },
  {
    slug: 'vitant-san-pedro',
    name: 'Vitant® San Pedro',
    price: 7875000, 
    appreciation: 7.6,
    rentPerMonth: 22600
  },
  {
    slug: 'vitant-santa-lucia',
    name: 'Vitant® Santa Lucía',
    price: 6250000,
    appreciation: 4.0,
    rentPerMonth: 24000
  }
]

const Calculator = () => {

  const queryParams = new URLSearchParams(window.location.search);
  const propertySlug = queryParams.get('property');

  const [property, setProperty] = useState(PROPERTIES.find(p => p.slug === propertySlug) || PROPERTIES[0]);

  const [meters, setMeters] = useState(1);
  const [years, setYears] = useState(15);
  const [price, setPrice] = useState(7125000);
  const [appreciation, setAppreciation] = useState(8.0);
  const [inflation, setInflation] = useState(5.0);
  const [rentPerMonth, setRentPerMonth] = useState(22300);
  const [appreciationPerYear, setAppreciationPerYear] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);

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

  const calculateRentPerYears = () => {
    let rentPerYear = [];
    for (let i = 1; i <= years; i++) {
      const rent = rentPerMonth * meters * 12 * (1 + inflation / 100) ** i;
      rentPerYear.push(rent);
    }
    
    
    return {
      rentPerYear,
      totalRent: rentPerYear.reduce((acc, curr) => acc + curr, 0)
    }
  }

  const { rentPerYear, totalRent } = calculateRentPerYears();

  useEffect(() => {
    calculateAppreciation();
    calculateRentPerYears();
  }, [years, meters]);

  useEffect(() => {
    setPrice(property.price);
    setAppreciation(property.appreciation);
    setRentPerMonth(property.rentPerMonth);
  }, [property]);

  return (
    <div className="flex flex-col">
      <div className="gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-start gap-8">
          <a className="flex items-center gap-1 text-primary text-sm" href={`https://www.briq.mx/sumametros/proyectos/${property.slug}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Regresar
          </a>
          <div>
            <h1 className="text-xl md:text-2xl">Conoce cuanto puede crecer tu patrimonio si inviertes en <strong className="block">{property.name}</strong></h1>
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
              <p className="font-semibold text-3xl">{centsToCurrency(totalRent)} pesos</p>
              <p className="text-base text-primary md:text-lg">{centsToCurrency(totalRent / years)} pesos anuales</p>
            </div>
          </div>
          <p className="font-black text-xl">Ganancia total: {centsToCurrency((totalEarnings - price*meters) + totalRent)} pesos</p>
          <div className="flex flex-col gap-2text-base">
            <div className='flex items-center gap-2 p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0 text-primary size-4">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
              </svg>
              <p>En todo momento eres dueño de tus m²</p>
            </div>
            <div className='flex items-center gap-2 p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0 text-primary size-4">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
              </svg>
              <p>Puedes comprar más m² y canjearlos por otros proyectos de BeGrand®</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a className="flex justify-center items-center gap-1 bg-primary p-3 border text-white" href="https://www.briq.mx/users/sign_up?landing=true">Comenzar a invertir</a>
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