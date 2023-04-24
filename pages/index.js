import Link from 'next/link'
import Footer from '@partials/Footer'
import Header from '@partials/Header'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1>The Future</h1>
          <p style={{ fontSize: '28px' }}>
            Explore how AI-driven agile and lean methodologies are reshaping education by making learning more personalized, adaptive, and efficient. We argue that school administrators need to adopt these approaches to stay competitive and meet the changing needs of students. Our Blog posts highlight the positive impact of AI-enhanced agile and lean approaches on learning outcomes, engagement, and resource utilization, revolutionizing the traditional education system.
          </p>
          <Link href='/blogs'>
            <button style={{ backgroundColor: 'pink', fontSize: '30px', padding: '10px 20px', borderRadius: '7px' }}>Go to Blogs</button>
          </Link>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src='/images/index-1.jpg' alt='description of your image' />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '50px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src='/images/index-2.jpg' alt='description of your image' />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h1>Storytellers</h1>
          <p style={{ fontSize: '28px' }}>
            At mywebclass.org, we are dedicated to educating teachers about the use of Artificial Intelligence (AI) in the classroom. Our mission is to help schools and educators provide better opportunities for their students by leveraging the power of AI. We offer a range of resources that are designed to help teachers learn about the fundamentals of AI, its applications in the classroom, and how it can be integrated into their teaching methods. Our team of experienced instructors are committed to providing high-quality education and support to help teachers feel confident and equipped to bring AI into their classrooms. Join us in this exciting journey towards a more innovative and inclusive future for education.
          </p>
          <Link href='/about'>
            <button style={{ backgroundColor: 'pink', fontSize: '30px', padding: '10px 20px', borderRadius: '7px' }}>Go to About</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
