'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ChefHat, Mail, Lock, User, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setConfirmationEmail(email);
        setShowConfirmation(true);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    setError('');
    setResendSuccess(false);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: confirmationEmail,
      });

      if (error) {
        setError(error.message);
      } else {
        setResendSuccess(true);
      }
    } catch (error) {
      setError('Failed to resend email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="flex min-h-screen items-center justify-center py-16 px-4 bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50/30">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-light text-charcoal-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Verify Your Email
              </h1>
              <p className="text-charcoal-600 font-light mb-2">
                We've sent a confirmation link to
              </p>
              <p className="text-sage-700 font-medium">{confirmationEmail}</p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="bg-sage-50 border border-sage-200 rounded-lg p-5">
                <p className="font-medium text-charcoal-900 mb-3">Next Steps:</p>
                <ol className="space-y-2 text-sm text-charcoal-700">
                  <li className="flex items-start gap-2">
                    <span className="text-sage-600 font-semibold">1.</span>
                    <span>Check your email inbox (and spam folder)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sage-600 font-semibold">2.</span>
                    <span>Click the confirmation link in the email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sage-600 font-semibold">3.</span>
                    <span>Return and sign in with your credentials</span>
                  </li>
                </ol>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {resendSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">Confirmation email sent! Check your inbox.</p>
                </div>
              )}

              <button
                onClick={handleResendEmail}
                disabled={resendLoading}
                className="w-full flex items-center justify-center gap-2 btn-secondary disabled:opacity-50"
              >
                {resendLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-sage-600 border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    <span>Resend Confirmation Email</span>
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-sage-200/50 text-center">
                <p className="text-sm text-charcoal-600">
                  Already confirmed?{' '}
                  <Link href="/login" className="font-medium text-sage-700 hover:text-sage-800 underline underline-offset-2">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-16 px-4 bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50/30">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-600 rounded-2xl mb-6">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-light text-charcoal-900 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Join Palate
            </h1>
            <p className="text-charcoal-600 font-light">Begin your personalized culinary journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-sage-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-luxury pl-10"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-sage-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-luxury pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-sage-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-luxury pl-10"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-sage-200/50 text-center">
            <p className="text-sm text-charcoal-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-sage-700 hover:text-sage-800 underline underline-offset-2">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}