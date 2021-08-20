import logo from '../images/white-logo.svg'
import p from '../images/p.svg'
import i from '../images/i.svg'
import tw from '../images/tw.svg'
import facebook from '../images/f.svg'

import './index.css'

const Footer = () => (
  <>
    <div className="footer">
      <div className="tasty">
        <img src={logo} alt="home" className="logo" />
        <h1 className="heads">Tasty Kitchens</h1>
      </div>
      <p className="paragraph">The only thing we are serious about is food.</p>
      <div className="tasty">
        <a href="https://in.pinterest.com/">
          <img src={p} alt="imh" className="social-media" />
        </a>
        <a href="https://www.instagram.com/">
          <img src={i} alt="imh" className="social-media" />
        </a>
        <a href="https://twitter.com/?lang=en">
          <img src={tw} alt="imh" className="social-media" />
        </a>
        <a href="https://www.facebook.com/">
          <img src={facebook} alt="imh" className="social-media" />
        </a>
      </div>
    </div>
  </>
)

export default Footer
