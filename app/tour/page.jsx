import Link from 'next/link'
import { getShows } from '../../lib/shows'

function formatDate(dateStr) {
  const [month, day, year] = dateStr.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  return {
    month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleString('default', { weekday: 'long' }),
    full: date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  }
}

export default async function TourPage() {
  const shows = await getShows()

  return (
    <div>
      <h1>Tour Dates</h1>
      <ul className="tour-list">
        {shows.map(show => {
          const { month, day, full } = formatDate(show.date)
          return (
            <li key={show.id} className="tour-item">
              <div className="tour-date">
                <span className="tour-month">{month}</span>
                <span className="tour-day">{day}</span>
              </div>
              <div className="tour-info">
                <p className="tour-venue">{show.venue}</p>
                <p className="tour-location">{show.city}, {show.state}</p>
                <p className="tour-full-date">{full}</p>
              </div>
              <div className="tour-action">
                {show.soldOut === 'true' ? (
                  <span className="tour-sold-out">Sold Out</span>
                ) : (
                  <a href={show.ticketUrl} target="_blank" className="btn">Tickets</a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}