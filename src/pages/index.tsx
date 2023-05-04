import { styled } from './styles'
import { Inter } from 'next/font/google'
import { HomeContainer, Product } from './styles/pages/home'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

import camiseta1 from '../pages/assents/Camisetas/1.png'
import camiseta2 from '../pages/assents/Camisetas/2.png'
import camiseta3 from '../pages/assents/Camisetas/3.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt='' />
        <footer>
          <strong>Camise X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta2} width={520} height={480} alt='' />
        <footer>
          <strong>Camise X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
