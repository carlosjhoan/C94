import { useForm } from "react-hook-form";
import { FormField } from "../../components/UI";
import { signUp } from "../../services/authService"

export const SignUpForm = ({ onSuccess, switchToSignIn }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        setError,
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async ({ email, password, displayName }) => {
        const { success, error, user } = await signUp(email, password);
        
        if (success) {
          // You might want to update the user's display name here
            console.log("User created:", user);
            reset();
            if (onSuccess) onSuccess();
        } else {
          // Handle Firebase errors
            if (error.includes('email-already-in-use')) {
                setError('email', { 
                type: 'manual', 
                message: 'This email is already registered' 
                });
            } else {
                setError('root', {
                type: 'manual',
                message: error
                });
            }
        }

        console.log("email and password: ", email, password)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
        {/* DISPLAY NAME */}
        <FormField
            label="Display Name"
            name="displayName"
            {...register('displayName', {
            required: 'Display name is required',
            minLength: {
                value: 2,
                message: 'Minimum length is 2 characters'
            }
            })}
            error={errors.displayName}
            required
        />

        {/* EMAIL */}
        <FormField
            label="Email"
            name="email"
            type="email"
            {...register('email', {
            required: 'Email is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
            })}
            error={errors.email}
            required
        />

        {/* PASSWORD */}
        <FormField
            label="Password"
            name="password"
            type="password"
            {...register('password', {
            required: 'Password is required',
            minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
            }
            })}
            error={errors.password}
            required
        />

        {/* CONFIRM PASSWORD */}
        <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value, { password }) => 
                value === password || 'Passwords do not match'
            })}
            error={errors.confirmPassword}
            required
        />

        {/* ROOT ERROR */}
        {errors.root && (
            <p className="form-error" role="alert">
            {errors.root.message}
            </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={ `
                    p-2
                    ${isSubmitting ? 'cursor-progress' : 'cursor-pointer' }
                    bg-blue-500
                    hover:bg-sky-700
                    focus:outline-offset-2
                    focus:outline-sky-500
                    active:bg-sky-500
                    text-white
                    rounded-full
                    w-50
                `}
        >
            {isSubmitting ? 'Subscribiendo...' : 'Listo!'}
        </button>

        <p className="mt-3 italic">
            ¿Ya estás subscrito?{' '}
            <button 
                type="button"
                onClick={switchToSignIn}
                className="p-2 bg-black hover:bg-gray-700 text-white rounded-full cursor-pointer w-40"
            >
                Ingresar
            </button>
        </p>
        </form>
    );
};