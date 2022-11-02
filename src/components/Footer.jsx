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
                    Về chúng tôi
                </Footer.Link>
                <Footer.Link href="/business-register">
                    Đăng ký người bán
                </Footer.Link>
                <Footer.Link href="#">
                    Liên hệ
                </Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    )
}