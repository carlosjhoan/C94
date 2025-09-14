import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = ()=>{


    return (
            <div className=' h-screen'>
                <Header />
                <main className="content">
                    <Outlet /> 
                </main>
                <Footer />

                {/* Outlet: This renders the matched route component */}
            </div>
            
    )
}