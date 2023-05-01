import { useRouter } from 'next/router'

export default function product() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { query } = useRouter() // Pegando o paramentro da URL, que no caso o ID

  return (
    <div>product: { JSON.stringify(query) }</div>
  )
}