import MagazineFlip from '../../components/MagazineFlip'

export default function AboutPage() {
  return (
    <div>
      {/* Meet the Band */}
      <section className="about-intro">
        <div className="about-intro-text">
          <h1>Meet the Band</h1>
          <p>
            Described by Highwire Daze Magazine as "Fire Personified," Huck N' Pray
            is a psychedelic, surfy, rock band hailing from the lively music scene
            of Boulder, Colorado. Formed in fall 2024 through deep dorm jams and
            pop-up performances on campus, a shared love for genre-bending,
            high energy music united lead guitarist Cory Shishik with rhythm
            guitarist Fintan Canning who were later joined by drummer Axel Pearson,
            with bassist Will Berbaum. Huck N' Pray quickly picked up momentum in
            the Boulder music scene, playing the iconic Fox Theatre as just their
            fourth gig as a band.
          </p>
        </div>
        <div className="about-intro-image">
          <img src={"viper.png"} alt={"band photo at Viper Room Los Angeles"}></img>
        </div>
        </section>
        <section className="about-quote-section">
          <div className="about-quote-image-wrapper">
            <img src="\Fox_Headline.jpeg" alt="Huck N' Pray" className="about-quote-image" />
            <div className="about-quote-overlay" />
         </div>
           <div className="about-quote-content">
            <blockquote className="about-quote-text">
              "Fire Personified"
            </blockquote>
            <p className="about-quote-attribution">— Highwire Daze Magazine</p>
          </div> 
        </section>
<section className="about-bio-section">
  <p className="about-bio-pull">"Grounded, fearless, and endlessly evolving"</p>
  <p className="about-bio-body">
    Huck N' Pray's sound challenges the status quo. No two setlists are ever the same,
    constantly being reshaped by gig and intuition. Their genre-blending approach breathes
    life into Boulder's scene, showcasing a mix of 60s-inspired surf rock, heavy psychedelic
    grooves, and an unfiltered energy that keeps audiences coming back for more.
  </p>
   <p className="about-quote-attribution">— Frontrunner Magazine</p>

</section>
    </div>
  )
}