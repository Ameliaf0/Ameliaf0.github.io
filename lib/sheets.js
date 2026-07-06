export async function logOrderToSheets(order) {
  const url = process.env.APPS_SCRIPT_URL

  if (!url) {
    console.log('No Apps Script URL set, skipping sheets logging')
    return
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
    redirect: 'follow',
  })

  const text = await res.text()
  console.log('Sheets response:', text)
}