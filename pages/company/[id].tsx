type Company = {
  id: number;
  title: string;
  body: string;
};

export default function company({ company }: { company: Company }) {
  return (
    <div>
      <h1>POST(投稿){company.id}</h1>
      <h2>{company.title}</h2>
      <p>{company.body}</p>
    </div>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const id = params.id;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const company = await res.json();
  return { props: { company } };
}
