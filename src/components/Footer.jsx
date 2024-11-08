// Footer.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <Container maxWidth="md" className="text-center">
                <Typography variant="h6" gutterBottom className="mb-3">
                    Connect with Us
                </Typography>

                <div className="d-flex justify-content-center mb-4">
                    <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-light hover mx-3">
                        <FaFacebookF size={28} />
                    </a>
                    <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-light hover mx-3">
                        <FaTwitter size={28} />
                    </a>
                    <a href="https://www.instagram.com/tony143____" target="_blank" rel="noopener noreferrer" className="text-light hover mx-3">
                        <FaInstagram size={28} />
                    </a>
                    <a href="https://www.linkedin.com/in/sai-teja--" target="_blank" rel="noopener noreferrer" className="text-light hover mx-3">
                        <FaLinkedinIn size={28} />
                    </a>
                    <a href="https://github.com/tony-143" target="_blank" rel="noopener noreferrer" className="text-light hover mx-3">
                        <FaGithub size={28} />
                    </a>
                </div>

                <Typography variant="body2" color="" className="text-center">
                    &copy; {new Date().getFullYear()} Movie-Review. All Rights Reserved.
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
