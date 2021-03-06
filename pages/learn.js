import Head from 'next/head'
import { Row, Col, Button, Card } from 'react-bootstrap';
import Layout from '../component/Layout.js';
import TopicBox from '../component/TopicBox.js';
import referenceData from '../docs/reference.js'
import Link from 'next/link'

export default function Learn({ posts, host, url }) {
  let categorys = [
    {
      id: 6,
      name: "Quickstart guide"
    },
    {
      id: 3,
      name: "บทความการใช้งาน"
    },
    {
      id: 7,
      name: "อุปกรณ์เสริม"
    },
    {
      id: 4,
      name: "วีดีโอ"
    },
    {
      id: 5,
      name: "โครงงาน"
    }
  ];

  return (
    <>
      <Head>
        <title>ศูนย์การเรียนรู้ - microBlock IDE</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content="เรียนรู้การใช้งาน microBlock IDE ตั้งแต่เริ่มต้นจนสร้างโปรเจคได้" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content={`https://${host}${url}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ศูนย์การเรียนรู้" />
        <meta property="og:description" content="เรียนรู้การใช้งาน microBlock IDE ตั้งแต่เริ่มต้นจนสร้างโปรเจคได้" />
        <meta property="og:image" content={`https://${host}/images/facebook-share-image.png`} />
      </Head>

      <style jsx>{`
      .topic-list {
        -webkit-flex: 0 0 25%;
        flex: 0 0 25%;
        max-width: 25%;
      }

      .reference-list {
        -webkit-flex: 0 0 20%;
        flex: 0 0 20%;
        max-width: 20%;
      }

      @media screen and (max-width: 992px) {
        .topic-list {
          -webkit-flex: 0 0 50%;
          flex: 0 0 50%;
          max-width: 50%;
        }

        .reference-list {
          -webkit-flex: 0 0 25%;
          flex: 0 0 25%;
          max-width: 25%;
        }
      }

      @media screen and (max-width: 768px) {
        .reference-list {
          -webkit-flex: 0 0 33.2%;
          flex: 0 0 33.2%;
          max-width: 33.2%;
        }
      }

      @media screen and (max-width: 576px) {
        .topic-list {
          -webkit-flex: 0 0 100%;
          flex: 0 0 100%;
          max-width: 100%;
        }

        .reference-list {
          -webkit-flex: 0 0 50%;
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      `}</style>

      <Layout>
        <section className="bg-light text-center p-5 mb-5">
          <h1 className="h1 mb-3">ศูนย์การเรียนรู้</h1>
          <p className="lead mb-3">เรียนรู้การใช้งาน microBlock IDE ตั้งแต่เริ่มต้นจนสร้างโปรเจคได้</p>
        </section>
        <section className="mb-5">
          {categorys.map((category) => (
            <div key={category.id} className="container mb-5">
              <h2 className="mb-4">{category.name}</h2>
              <Row className="row-cols-4">
                {posts.filter(post => post.categories.indexOf(category.id) >= 0).map(post => (
                  <div className="col-lg topic-list" key={post.id}>
                    <TopicBox key={post.id} id={post.id} title={post.title.rendered} text={post.yoast.metadesc} cover={post.yoast["opengraph-image"]} category={category.name} />
                  </div>
                ))}
              </Row>
            </div>
          ))}
          <div className="container mb-5">
            <h2 className="mb-4">Code Reference</h2>
            <Row>
              {referenceData.map(category => (
                <div className="col-sm-2 reference-list" key={category.name}>
                  <Link href={`/reference/${encodeURIComponent(category.name)}`} passHref>
                    <a className="card-link">
                      <Card className="mb-3">
                        <Card.Img variant="top" src={category.icon} className="p-4" />
                        <Card.Body>
                          <Card.Title className="card-title" dangerouslySetInnerHTML={{ __html: category.name }}></Card.Title>
                          <Card.Text className="card-text"><span dangerouslySetInnerHTML={{ __html: category.description }}></span></Card.Text>
                        </Card.Body>
                      </Card>
                    </a>
                  </Link>
                </div>
              ))}
            </Row>
          </div>
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  const res = await fetch("https://manager.microblock.app/wp-json/wp/v2/posts?per_page=100&_fields[]=id&_fields[]=modified&_fields[]=title&_fields[]=categories&_fields[]=yoast.metadesc&_fields[]=yoast.opengraph-image");
  const data = await res.json();

  return { props: { posts: data, host: req.headers.host, url: req.url } }
}

