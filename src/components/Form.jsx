import { useState } from 'react'

export default function Form() {
	const [responseMessage, setResponseMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const scriptURL = 'https://script.google.com/macros/s/AKfycbwmQ-whj7ctMcPuSY8HWjLnk3WDWOl_ejI0Oh9Aua2CqqvrgyUW3pO-IHRAEm9fsoph/exec'

	async function submit(e) {
		e.preventDefault()
		setIsSubmitting(true)
		let requestBody = new FormData(e.target)
		try {
			const response = await fetch(scriptURL, { method: 'POST', body: requestBody})
			setResponseMessage('¡Gracias! Te avisaremos cuando puedas invertir.')
		} catch (error) {
			alert('Error!', error.message)
			setResponseMessage('Error: ' + error.message)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={submit} className="flex flex-col gap-4">
			<label htmlFor="name">
				Nombre completo
				<input type="text" id="Name" name="Name" autoComplete="name" required className="w-full rounded-md border p-2 text-lg" placeholder="Nombre y apellido" />
			</label>
			<label htmlFor="email">
				Correo electrónico
				<input type="email" id="Email" name="Email" autoComplete="email" required className="w-full rounded-md border p-2 text-lg" placeholder="Correo electrónico" />
			</label>
			<button disabled={isSubmitting} className="w-full rounded-md bg-primary p-2 text-lg font-semibold text-white">
				{isSubmitting ? 'Enviando...' : 'Anotarme en la lista'}
			</button>
			{responseMessage && <p className="bg-blue-50 p-2 text-center w-full rounded-md">{responseMessage}</p>}
		</form>
	)
}