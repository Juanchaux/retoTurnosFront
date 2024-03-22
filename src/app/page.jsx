import NavBar from '@/components/navBar'
import Card from '@/components/card'
import Image from 'next/image'
import Fila from '@/Media/fila.png'
import Link from 'next/link'
import Button from '@/components/button'

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <NavBar />
      <div className="flex">
        <div className="flex w-full justify-center items-center">
          <div className="w-full flex flex-row items-center mt-10 justify-around">
            <div className="flex w-5/12">
              <Card>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-4xl font-bold text-center mt-20">
                    ¡Bienvenido a TurnoTech!
                  </h1>
                  <p className="text-xl text-center mt-5">
                    En TurnoTech, tu comodidad es nuestra prioridad. Solicitar
                    un turno nunca ha sido tan fácil. Nuestro sistema te permite
                    reservar tu cita en tan solo unos clics, sin complicaciones
                    ni esperas innecesarias. ¡Hazlo ahora y asegura tu lugar!
                  </p>
                  <Link href="/solicitarTurno">
                    <Button>Solicitar Turno</Button>
                  </Link>
                </div>
              </Card>
            </div>
            <div className="flex bg-yellow w-auto h-auto rounded-full shadow-2xl">
              <Image src={Fila} alt="Descripción de la imagen" width={500} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
