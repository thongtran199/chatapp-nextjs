'use client';

import { Input, Form, Flex, Button } from 'antd';
import { useTranslations } from 'next-intl';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from '@/components/Navigation';
import { FormProps } from 'antd/lib';
import { useForm } from 'antd/es/form/Form';
import { signInAsync } from './thunks';
import { useDispatch, useSelector } from '@/lib/redux';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { pick } from 'lodash';
import CustomizeRequiredMark from '@/components/CustomizeRequiredMark';
import ModalView from '@/components/ModalView';
import { useState } from 'react';
import { selectCurrentSignInStatus, selectErrorMessage } from './selectors';
import { ApiStatus } from '@/common/enums/apiStatus';
import { SignInRequest } from '@/common/models/signIn';

export default function SignIn() {
  const t = useTranslations('SignInPage');
  const g = useTranslations('General');
  const [modalVisible, setModalVisible] = useState(false);
  const status = useSelector(selectCurrentSignInStatus);
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();
  const [form] = useForm();
  const router = useRouter();

  const onFinish: FormProps<SignInRequest>['onFinish'] = async (values) => {
    const accountSignIn = pick(values, ['usernameOrEmail', 'password']);
    const resultAction = await dispatch(signInAsync(accountSignIn));
    if (signInAsync.fulfilled.match(resultAction)) {
      router.push({
        pathname: '/explore',
      });
    } else {
      setModalVisible(true);
    }
  };

  const onFinishFailed: FormProps<SignInRequest>['onFinishFailed'] = (
    errorInfo,
  ) => errorInfo;
  return (
    <div>
      <ModalView
        visible={modalVisible}
        setVisible={setModalVisible}
        cancelText={g('close')}
        description={errorMessage}
      />
      <Flex
        vertical
        align="center"
        justify="center"
        className="overflow-hidden relative pb-20 w-full h-[100vh] mt-5"
      >
        <Form
          name="signInForm"
          className="w-1/3"
          colon={false}
          labelCol={{ flex: '200px' }}
          labelAlign="left"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={CustomizeRequiredMark}
        >
          <Flex vertical flex={1}>
            <span className="text-2xl text-center font-bold leading-8 text-slate-800 mb-5">
              {t('signInToChatApp')}
            </span>
            <Flex vertical>
              <Form.Item
                label={t('usernameOrEmail')}
                name="usernameOrEmail"
                rules={[
                  {
                    required: true,
                    message: t('usernameOrEmailRequiredValidation'),
                  },
                ]}
              >
                <Input maxLength={50} placeholder={t('usernameOrEmail')} />
              </Form.Item>

              <Form.Item
                label={t('password')}
                name="password"
                rules={
                  [
                    // {
                    //   required: true,
                    //   message: t('passwordRequiredValidation'),
                    // },
                  ]
                }
              >
                <Input.Password maxLength={50} placeholder={t('password')} />
              </Form.Item>

              <Form.Item>
                <Flex justify="center">
                  <Button
                    htmlType="submit"
                    size="middle"
                    loading={status == ApiStatus.Loading}
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    className="mt-2"
                    style={{ padding: '0px 80px' }}
                  >
                    Đăng nhập
                  </Button>
                </Flex>
              </Form.Item>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </div>
  );
}
