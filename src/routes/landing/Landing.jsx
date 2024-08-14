import './Landing.scss'
import * as components from './components'

export const Landing = () => {

  return (
    <>
      <main className='hero-background'>
        <section className='app-name-container'>
          <div className='app-info'>
            <h1 className='app-name'>PROJECT HERCULES</h1>
            <span className='subtext-string'>Powered by </span>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/1280px-Google_Gemini_logo.svg.png' alt='Gemini' className='subtext-gemini-logo'/>
          </div>
        </section>
        {/* TODO: Is a button to test navigate to the test Home component. */}
        <div className='anchored-action-button'>
          <components.GetStartedButton />
        </div>
      </main>
    </>
  )
}
