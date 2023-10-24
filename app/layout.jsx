import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
    title: 'Prompterino',
    description: 'Discover and share prompts'
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;
