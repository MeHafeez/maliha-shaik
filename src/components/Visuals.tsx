import type { ReactNode } from 'react'
import type { VisualKind } from '../data'

/* Hand-built interface sketches. They illustrate the kind of UI each project
   involved; they are not screenshots of the real products. */

function Chrome({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="v-window">
      <div className="v-bar">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <div className="v-body">{children}</div>
    </div>
  )
}

function Cms() {
  return (
    <Chrome url="cms / content / titles">
      <div className="v-cms">
        <aside>
          <b />
          <span className="on" />
          <span />
          <span />
          <span />
        </aside>
        <div className="v-cms-main">
          <div className="v-cms-head">
            <strong>Titles</strong>
            <em>+ New title</em>
          </div>
          {['Published', 'Draft', 'Published', 'Scheduled'].map((s, i) => (
            <div className="v-row" key={i}>
              <span className="v-thumb" />
              <span className="v-line" style={{ width: `${68 - i * 9}%` }} />
              <span className={`v-chip v-chip-${s.toLowerCase()}`}>{s}</span>
            </div>
          ))}
          <div className="v-field is-error">
            <label>Title name</label>
            <div className="v-input" />
            <small>Title name is required</small>
          </div>
        </div>
      </div>
    </Chrome>
  )
}

function Stripe() {
  return (
    <div className="v-stripe">
      <div className="v-term">
        <span>$ npm publish</span>
        <span className="ok">+ stripe payment component</span>
      </div>
      <div className="v-pay">
        <div className="v-pay-head">
          <span>Checkout</span>
          <b>$9.99</b>
        </div>
        <div className="v-field">
          <label>Card number</label>
          <div className="v-input mono">4242 4242 4242 4242</div>
        </div>
        <div className="v-split">
          <div className="v-field">
            <label>Expiry</label>
            <div className="v-input mono">12 / 29</div>
          </div>
          <div className="v-field">
            <label>CVC</label>
            <div className="v-input mono">•••</div>
          </div>
        </div>
        <div className="v-btn">Pay $9.99</div>
        <small className="v-secure">Secured by Stripe Elements</small>
      </div>
    </div>
  )
}

function Iframe() {
  return (
    <Chrome url="partner.app / track">
      <div className="v-iframe">
        <div className="v-host">
          <span className="v-line" style={{ width: '40%' }} />
          <span className="v-line" style={{ width: '62%' }} />
        </div>
        <div className="v-frame">
          <span className="v-frame-tag">&lt;iframe&gt;</span>
          <div className="v-poster" />
          <div className="v-actions">
            <span className="v-btn ghost">Rent · TVOD</span>
            <span className="v-btn">Subscribe</span>
          </div>
          <div className="v-api">
            <span>POST /addTVOD</span>
            <span>POST /addSubscription</span>
          </div>
        </div>
      </div>
    </Chrome>
  )
}

function Plans() {
  return (
    <Chrome url="go3 / choose-plan">
      <div className="v-plans">
        <p className="v-plans-title">Choose your plan</p>
        <div className="v-plans-row">
          {['Basic', 'Standard', 'Premium'].map((p, i) => (
            <div className={`v-plan${i === 1 ? ' is-pick' : ''}`} key={p}>
              {i === 1 && <span className="v-badge">Popular</span>}
              <strong>{p}</strong>
              <span className="v-line" style={{ width: '80%' }} />
              <span className="v-line" style={{ width: '60%' }} />
              <span className="v-line" style={{ width: '70%' }} />
              <span className={`v-btn${i === 1 ? '' : ' ghost'}`}>Select</span>
            </div>
          ))}
        </div>
        <div className="v-steps">
          <span className="on">Plan</span>
          <span>Register</span>
          <span>Pay</span>
        </div>
      </div>
    </Chrome>
  )
}

function ErrorState() {
  return (
    <Chrome url="tabii / payment">
      <div className="v-error">
        <div className="v-pay dim">
          <div className="v-field">
            <label>Card number</label>
            <div className="v-input mono">4000 0000 0000 0002</div>
          </div>
          <div className="v-btn">Pay now</div>
        </div>
        <div className="v-modal">
          <span className="v-modal-icon">!</span>
          <strong>Payment declined</strong>
          <p>Your bank declined this card. Try another payment method.</p>
          <div className="v-actions">
            <span className="v-btn ghost">Cancel</span>
            <span className="v-btn">Try again</span>
          </div>
        </div>
      </div>
    </Chrome>
  )
}

function Stepper() {
  return (
    <Chrome url="simpletv / sign-up">
      <div className="v-stepper">
        <div className="v-stepper-dots">
          <span className="done">✓</span>
          <i />
          <span className="on">2</span>
          <i />
          <span>3</span>
        </div>
        <div className="v-field is-ok">
          <label>Email</label>
          <div className="v-input">viewer@example.com</div>
        </div>
        <div className="v-field is-error">
          <label>Password</label>
          <div className="v-input mono">••••</div>
          <small>Must be at least 8 characters</small>
        </div>
        <div className="v-field is-error">
          <label>ZIP code</label>
          <div className="v-input mono">12A</div>
          <small>Enter a valid ZIP code</small>
        </div>
        <div className="v-btn">Continue</div>
      </div>
    </Chrome>
  )
}

export function ProjectVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case 'cms':
      return <Cms />
    case 'stripe':
      return <Stripe />
    case 'iframe':
      return <Iframe />
    case 'plans':
      return <Plans />
    case 'error':
      return <ErrorState />
    case 'stepper':
      return <Stepper />
  }
}

/* The hero "specimen": a checkout card that types, fails validation, recovers
   and pays on a loop (driven from motion.ts). */
export function Specimen() {
  return (
    <div className="specimen" aria-hidden="true">
      <div className="spec-stage">
        <span className="spec-tag spec-tag-top">&lt;CheckoutCard variant="secure" /&gt;</span>
        <div className="spec-card">
          <div className="sc-head">
            <span>Premium · Monthly</span>
            <b>$9.99</b>
          </div>
          <div className="sc-field">
            <span className="sc-label">Card number</span>
            <div className="sc-input mono">
              <span className="sc-num" />
              <i className="sc-caret" />
            </div>
          </div>
          <div className="sc-row">
            <div className="sc-field sc-exp-field">
              <span className="sc-label">Expiry</span>
              <div className="sc-input mono">
                <span className="sc-exp" />
              </div>
            </div>
            <div className="sc-field">
              <span className="sc-label">CVC</span>
              <div className="sc-input mono">
                <span className="sc-cvc" />
              </div>
            </div>
          </div>
          <div className="sc-error">
            <span>✕</span> Card has expired
          </div>
          <div className="sc-pay">
            <span className="sc-pay-text">Pay $9.99</span>
          </div>
          <div className="sc-foot">Validated with Formik + Yup</div>
        </div>
        <span className="spec-note spec-note-a">
          <i />
          yup.string().required()
        </span>
        <span className="spec-note spec-note-b">
          <i />
          aria-live="polite"
        </span>
        <span className="spec-note spec-note-c">
          <i />
          Stripe Elements
        </span>
      </div>
    </div>
  )
}
