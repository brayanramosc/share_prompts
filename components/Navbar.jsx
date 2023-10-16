"use client";

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const getProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        getProviders();
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={"/"} className='flex gap-2 flex-center'>
                <Image
                    src={"/assets/images/logo.svg"}
                    alt='Prompterino logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />

                <p className='logo_text'>
                    Prompterino
                </p>
            </Link>

            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href={'/create-prompt'} className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href={'/profile'}>
                            <Image
                                src={'/assets/images/logo.svg'}
                                alt='profile image'
                                width={37}
                                height={37}
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) =>
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            )}
                    </>
                )}
            </div>

            <div className='sm:hidden flex relative'>
                {isUserLoggedIn ?
                    <div className='flex'>
                        <Image
                            src={'/assets/images/logo.svg'}
                            alt='profile image'
                            width={37}
                            height={37}
                            className='rounded-full'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href={'/profile'}
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={'/create_prompt'}
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    className='mt-5 w-full black_btn'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                    : <>
                        {providers &&
                            Object.values(providers).map((provider) =>
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            )}
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;
