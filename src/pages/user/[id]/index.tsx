import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import prisma from '../../../lib/prisma';

async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE',
  });
  await Router.push('/');
}

/* Allows you to view user card info and delete user card*/
const UserPage = (props) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return <div>Authenticating</div>;
  }

  const userHasValidSession = Boolean(session);

  const postBelongsToUser = session?.user?.email == props.author?.email;

  let title = props.title;

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.author?.name || 'Unknown author'}</p>
      <ReactMarkdown source={props.content} />
      {!props.published && userHasValidSession && postBelongsToUser && (
        <button onClick={() => publishPost(props.id)}>Publish</button>
      )}
      {userHasValidSession && postBelongsToUser && (
        <button onClick={() => deletePost(props.id)}>Delete</button>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

export default UserPage;
