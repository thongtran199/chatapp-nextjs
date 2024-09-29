import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from '@/lib/redux';
import { Flex, Input } from 'antd';
import UserCollapse from './UserCollapse';
import { searchUsersByFullNameContainingAsync } from '../thunks';
import {
  setDebouncedInputInSlice,
  setEmptyFoundUsers,
  setIdleStatus,
} from '../slice';
import { selectStatus } from '../selectors';
import { ApiStatus } from '@/common/enums/apiStatus';
import User from '@/services/user';
import { UserOutlined } from '@ant-design/icons';

const SearchUser = () => {
  const t = useTranslations('ExplorePage');
  const dispatch = useDispatch();
  const [searchFullNameInput, setSearchFullNameInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(searchFullNameInput);
  const foundUserStatus = useSelector(selectStatus);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(searchFullNameInput);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchFullNameInput]);

  useEffect(() => {
    if (debouncedInput) {
      dispatch(
        searchUsersByFullNameContainingAsync({
          userId: Number(User.getInstance().getUserId()),
          fullName: debouncedInput,
        }),
      );
      dispatch(setDebouncedInputInSlice(debouncedInput));
    }
  }, [debouncedInput, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setSearchFullNameInput(e.target.value);

    if (inputValue === '') {
      dispatch(setIdleStatus());
      dispatch(setEmptyFoundUsers());
    }
  };

  return (
    <Flex vertical gap={8} className="mx-5">
      <Input
        size="large"
        prefix={<UserOutlined />}
        placeholder={t('placeHolderInput')}
        value={searchFullNameInput}
        onChange={handleInputChange}
      ></Input>
      {foundUserStatus !== ApiStatus.Idle && <UserCollapse />}
    </Flex>
  );
};

export default SearchUser;
