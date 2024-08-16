import './Landing.scss'
import * as components from './components'

export const Landing = () => {

  return (
    <>
      <main className='hero-background'>
        <section className='app-name-container'>
          <div>
            <h1 className='app-name'>PROJECT HERCULES</h1>
            <span className='subtext-string'>Powered by </span>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/1280px-Google_Gemini_logo.svg.png' alt='Gemini' className='subtext-gemini-logo'/>
            <div className='subtext-blurb'>
              <p>Want to create workouts for everyday use? Project Hercules has you covered!</p>
              <p><b>Create Workouts</b> : Generated a workout powered by Gemini API that is tailored to your specifications</p>
              <p><b>View and Delete your Workouts </b> : View your workouts and customize your saved workouts to your liking</p>
            </div>
          </div>
        </section>
        <div className='anchored-action-button'>
          <components.GetStartedButton />
        </div>
      </main>
    </>
  )
}
