// / eslint-disable react/no-unescaped-entities 
"use client"
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 text-white bg-bgSMUpdate md:bg-bgUpdate">
            <Head>
                <title>Page Not Found</title>
            </Head>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-md"
            >
                <div className="text-7xl font-bold  mb-4">404</div>

                <h1 className="text-2xl font-medium text-gray-200 mb-3">Page not found</h1>

                <p className="text-gray-200 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-24 h-24 mx-auto text-gray-300"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <Link href="/" passHref>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-medium"
                    >
                        Go back home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}