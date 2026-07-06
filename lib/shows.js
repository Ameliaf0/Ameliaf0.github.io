export async function getShows() {
  const url = process.env.NEXT_PUBLIC_SHOWS_SHEET_URL

  if (!url) {
    return [
      { id: 'show-1', date: '2025-08-14', venue: 'Venue Name', city: 'Denver', state: 'CO', ticketUrl: '#', soldOut: 'false' },
      { id: 'show-2', date: '2025-08-22', venue: 'Venue Name', city: 'Austin', state: 'TX', ticketUrl: '#', soldOut: 'false' },
      { id: 'show-3', date: '2025-09-05', venue: 'Venue Name', city: 'Chicago', state: 'IL', ticketUrl: '#', soldOut: 'true' },
      { id: 'show-4', date: '2025-09-18', venue: 'Venue Name', city: 'New York', state: 'NY', ticketUrl: '#', soldOut: 'false' },
    ]
  }

  const res = await fetch(url, { next: { revalidate: 10 } })
  const text = await res.text()
  const rows = text.trim().split('\n').slice(1)

  return rows.map((row, i) => {
    const [date, venue, city, state, ticketUrl, soldOut] = row.split(',')
    return {
      id: `show-${i}`,
      date: date.trim(),
      venue: venue.trim(),
      city: city.trim(),
      state: state.trim(),
      ticketUrl: ticketUrl.trim(),
      soldOut: soldOut.trim(),
    }
  })
}