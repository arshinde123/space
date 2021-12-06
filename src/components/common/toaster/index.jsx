import { Toaster, ToastBar, toast } from 'react-hot-toast';
import Alert from '../alert';

const CustomToaster = () => (
    <Toaster
        containerStyle={{ top: '5vh' }}
        toastOptions={{
            duration: 2000,
            position: 'top-center',
            style: {
                padding: '0px',
                maxWidth: '400px',
            },
        }}
    >
        {(t) => (
            <ToastBar toast={t}>
                {(props) => (
                    <>
                        <Alert
                            title={t.title}
                            description={t.message}
                            variant={t.variant}
                            severity={t.severity}
                            onClose={() => toast.dismiss(t.id)}
                        />
                    </>
                )}
            </ToastBar>
        )}
    </Toaster>
);

export default CustomToaster;
