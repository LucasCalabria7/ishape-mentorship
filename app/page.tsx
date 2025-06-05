import Link from "next/link"
import { Button } from "@/components/ui/button"
import PublicLayout from "@/components/layouts/public-layout"
import logo from "@/components/assets/initial-page-image.svg"
import initialPhoto from "@/components/assets/LOGO-COMPLETA-SEM-BG.png"
import Image from 'next/image'


export default function Home() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center min-h-screen bg-[#1d1d1d] px-4">
        <div className="w-full h-[80vh] relative mb-6">
          <Image
            src={initialPhoto}
            alt="iShape Welcome"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full max-w-[200px] mb-8">
          <Image
            src={logo}
            alt="iShape Logo"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-col w-full max-w-[280px] gap-4">
          <Link href="/login" className="w-full">
            <Button 
              className="w-full bg-[#e86e23] hover:bg-[#e86e23]/90 text-white font-montserrat"
            >
              Login
            </Button>
          </Link>
          
          <Link href="/register" className="w-full">
            <Button 
              className="w-full bg-[#e86e23] hover:bg-[#e86e23]/90 text-white font-montserrat"
            >
              Cadastro
            </Button>
          </Link>
          
          <a 
            href="https://initial.ishape.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button 
              className="w-full bg-[#e86e23] hover:bg-[#e86e23]/90 text-white font-montserrat"
            >
              Iniciar Avaliação
            </Button>
          </a>
        </div>
      </div>
    </PublicLayout>
  )
}