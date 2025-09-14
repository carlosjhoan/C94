import { useForm } from "react-hook-form";
import { FormField } from "../../components/UI";
import { signIn } from "../../services/authService"

export const SignInForm = ({ onSuccess, switchToSignUp }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        setError,
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
        email: '',
        password: ''
        }
    });

    const onSubmit = async ({ email, password }) => {
        const { success, error, user } = await signIn(email, password);
        
        if (success) {
        console.log("User signed in:", user);
        reset();
        if (onSuccess) onSuccess();
        } else {
        // Handle Firebase errors
        if (error.includes('user-not-found') || error.includes('wrong-password')) {
            setError('root', {
            type: 'manual',
            message: 'Contraseña o correo incorrectos'
            });
        } else {
            setError('root', {
            type: 'manual',
            message: error
            });
        }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
        {/* EMAIL */}
        <FormField
            label="Email"
            name="email"
            type="email"
            {...register('email', {
            required: 'Email is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Formato de correo incorrecto'
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
            required: 'Es obligatorio ingresar una contraseña'
            })}
            error={errors.password}
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
            className={`
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
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className="mt-3 italic">
            ¿No te has subscrito todavía?{' '}
            <button type="button" onClick={switchToSignUp} className="p-2 bg-black hover:bg-gray-700 text-white rounded-full cursor-pointer w-40">
                Subscribirme
            </button>
        </p>
        </form>
    );
};