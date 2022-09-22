import { Footer } from "flowbite-react";


export default function AppFooter() {
    return (
        <Footer container={true}>
            <Footer.Copyright
                href="#"
                by="Arizone™"
                year={2022}
            />
            <Footer.LinkGroup>
                <Footer.Link href="#">
                    About
                </Footer.Link>
                <Footer.Link href="/register">
                    Register
                </Footer.Link>
                <Footer.Link href="/login">
                    Login
                </Footer.Link>
                <Footer.Link href="#">
                    Contact
                </Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    )
}