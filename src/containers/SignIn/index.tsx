'use client';

import { Input, Select, Form } from 'antd';
import { Flex } from '@/components/Flex';
import { Text } from '@/components/Text';
import { useTranslations } from 'next-intl';
import CheckBox from '@/components/Checkbox';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from '@/components/Button';
import { Link } from '@/components/Navigation';
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
import { useRouter } from '@/components/Navigation';
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
    <AuthenticatedLayout>
      <ModalView
        visible={modalVisible}
        setVisible={setModalVisible}
        cancelText={g('close')}
        description={errorMessage}
      />
      <Flex
        vertical
        align="center"
        className="overflow-hidden relative pb-20 w-full"
      >
        <Form
          name="signInForm"
          className="w-1/3"
          colon={false}
          labelCol={{ flex: '150px' }}
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
                <Input maxLength={50} placeholder={t('fullName')} />
              </Form.Item>

              <Form.Item
                label={t('password')}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('passwordRequiredValidation'),
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: t('passwordFormatValidation'),
                  },
                ]}
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
                    {t('signInNow')}
                  </Button>
                </Flex>
              </Form.Item>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </AuthenticatedLayout>
  );
}
