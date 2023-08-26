import Link from 'next/link';
import Messages from './messages';
import { createClient } from '@supabase/supabase-js'
import './login.css'; 

export default function Login() {
  return (
      <div className="login-container">
        <Link href="/" className="login-link">
          Back
        </Link>
        <form
          className="login-form"
          action="/auth/sign-in"
          method="post"
        >
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            className="login-input"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="login-button login-button-signin">
            Sign In
          </button>
          <button
            formAction="/auth/sign-up"
            className="login-button login-button-signup"
          >
            Sign Up
          </button>
          <Messages />
        </form>
      </div>
  );
}
