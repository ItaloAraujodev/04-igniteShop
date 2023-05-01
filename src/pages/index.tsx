import { styled } from './styles'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Button = styled('button', {
  backgroundColor: '$rocketseat'
})


export default function Home() {
  return (
    <div>
      <Button>Hello world</Button>
    </div>
  )
}
