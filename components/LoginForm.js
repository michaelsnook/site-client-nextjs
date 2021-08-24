import { useState } from 'react'
import { postLogin } from '../lib/login.js'
import { useForm } from 'react-hook-form'
import ErrorList from '../components/ErrorList'

const ConfirmationMessage = ({ user }) => (
  <div className="bg-green-200 border rounded border-green-600 text-green-800 p-10">
    <h1 className="my-4 h3">Success</h1>
    <p className="my-4">
      You&apos;re logged in as user <em>{user?.username}</em>
    </p>
  </div>
)

export default function Login() {
  const [user, setLoggedIn] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [loginErrors, setErrors] = useState([])
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = data => {
    setErrors([])
    setSubmitting(true)
    postLogin(data)
      .then(user => setLoggedIn(user))
      .catch(errors => setErrors(errors))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="mx-auto max-w-lg my-6">
      {user ? (
        <ConfirmationMessage user={user} />
      ) : (
        <>
          <h1 className="h3 text-gray-700">Please log in</h1>
          <form role="form" onSubmit={handleSubmit(onSubmit)} className="form">
            <fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  {...register('username', { required: 'required' })}
                  aria-invalid={errors.username ? 'true' : 'false'}
                  className={errors.username ? 'border-red-600' : ''}
                  tabIndex="1"
                  type="slug"
                  placeholder="username"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  {...register('password', { required: 'required' })}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className={errors.password ? 'border-red-600' : ''}
                  tabIndex="2"
                  type="password"
                  placeholder="****"
                />
              </div>
              <div>
                <button
                  tabIndex="3"
                  className="button solid"
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  Log in
                </button>
              </div>
            </fieldset>
            <ErrorList summary="Failed to log in" errors={loginErrors} />
          </form>
        </>
      )}
    </div>
  )
}
