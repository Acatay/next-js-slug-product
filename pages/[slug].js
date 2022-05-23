import React from 'react'

export default function Product({post}) {
  return (
    <div> {post.data.name} </div>
  )
}

export async function getStaticPaths() {
    const res = await fetch('https://www.yourwebsite.com/api/products')
    const posts = await res.json()
  
    const paths = posts.data.map((post) => ({
      params: { slug: post.link.replace('/', '') }, //post.link'in başında / olduğundan ötürü onu silmek için
    }))
  
    return { paths, fallback: false }
  }
  
  export async function getStaticProps({ params }) {
    const arr = params.slug.split('-') //Aldığımız slug değerinin sonunda id var o yüzden -'lardan ayırıyoruz
    const res = await fetch(`https://www.yourwebsite.com/api/products/${arr[arr.length - 1]}`) //Arrayin son elemanında id var o yüzden böyle yaptık
    const post = await res.json()
  
    return { props: { post } }
  }