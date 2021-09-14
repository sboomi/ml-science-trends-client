import { useRouter } from 'next/router';
import useSWR from 'swr';
import EditUserForm from './../../../components/User/EditUserForm';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditUserInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: user, error } = useSWR(id ? `/api/users/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;
  if (!user) return <p>Loading...</p>;

  const userForm = {
    name: user.name,
    avatar: user.avatar,
  };

  return (
    <EditUserForm
      formId="edit-user-form"
      userForm={userForm}
      forNewUser={false}
    />
  );
};

export default EditUserInfo;
