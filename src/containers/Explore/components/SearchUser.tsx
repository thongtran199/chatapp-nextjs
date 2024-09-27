import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from '@/lib/redux';
import { Flex, Form, FormInstance, Input } from 'antd';
import Image from '@/components/Image';
import UserCollapse from './UserCollapse';
import { searchUsersByFullNameContainingAsync } from '../thunks';
import { setEmptyFoundUsers, setIdleStatus } from '../slice';
import { selectStatus } from '../selectors';
import { ApiStatus } from '@/common/enums/apiStatus';

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
      dispatch(searchUsersByFullNameContainingAsync(debouncedInput));
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
    <>
      <Flex gap={8}>
        <Input
          placeholder={t('placeHolderInput')}
          value={searchFullNameInput}
          onChange={handleInputChange}
        ></Input>
      </Flex>
      {foundUserStatus !== ApiStatus.Idle && <UserCollapse />}
    </>
  );
};

export default SearchUser;
