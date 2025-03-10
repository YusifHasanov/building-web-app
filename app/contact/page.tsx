'use client'
import {ContactHero} from "@/components/contact-hero"
import {ContactForm} from "@/components/contact-form"
import {ContactInfo} from "@/components/contact-info"
import {motion} from "framer-motion"

// export const metadata = {
//     title: "Kontakt - Baku Bau GmbH",
//     description: "Kontaktieren Sie Baku Bau GmbH für Ihre Bauprojekte.",
// }

export default function ContactPage() {
    return (
        <div className="space-y-20 pb-20">
            <ContactHero/>

            <div className="space-y-8 max-w-4xl w-full mx-auto p-4 md:p-6 lg:p-8">
                <h2 className="text-4xl font-bold mb-6 text-center">Anfahrt</h2>

                {/* Animasyonlu iframe */}
                <motion.div
                    className="aspect-video relative rounded-lg overflow-hidden shadow-lg"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    whileHover={{scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)"}}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.058131071929!2d6.903346676694214!3d50.83008715995655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf22f2c163619f%3A0xd8308923d39ed3b2!2sBurgstra%C3%9Fe%203%2C%2050321%20Br%C3%BChl%2C%20Almanya!5e0!3m2!1str!2saz!4v1740742972457!5m2!1str!2saz"
                        width="100%"
                        height="100%"
                        style={{border: 0}}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                    {/*<iframe*/}
                    {/*    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409456942976!2d13.404954!3d52.520007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjQnMTcuOCJF!5e0!3m2!1sen!2sde!4v1635959106564!5m2!1sen!2sde"*/}
                    {/*    width="100%"*/}
                    {/*    height="100%"*/}
                    {/*    style={{ border: 0 }}*/}
                    {/*    allowFullScreen*/}
                    {/*    loading="lazy"*/}
                    {/*    referrerPolicy="no-referrer-when-downgrade"*/}
                    {/*/>*/}
                </motion.div>
            </div>

            <div className="container grid lg:grid-cols-2 ml-auto mr-auto gap-12">
                <ContactForm/>
                <ContactInfo/>
            </div>
        </div>
    )
}