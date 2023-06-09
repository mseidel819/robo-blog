import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Matt&apos;s Blog | Contact</title>
        <meta name="description" content="Send me a message" />
      </Head>
      <ContactForm />
    </>
  );
};
export default ContactPage;
