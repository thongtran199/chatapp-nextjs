'use client';

import { Input, Form, Flex, Button } from 'antd';
import { useTranslations } from 'next-intl';
import { ArrowRightOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib';
import { useForm } from 'antd/es/form/Form';
import { signUpAsync } from './thunks';
import { useDispatch, useSelector } from '@/lib/redux';
import { AccountSignUp } from '@/common/models/signUp';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { pick } from 'lodash';
import CustomizeRequiredMark from '@/components/CustomizeRequiredMark';
import ModalView from '@/components/ModalView';
import { useState } from 'react';
import { selectCurrentSignUpStatus } from './selectors';
import { ApiStatus } from '@/common/enums/apiStatus';
import { useRouter } from '@/components/Navigation';

export default function SignUp() {
  const t = useTranslations('SignUpPage');
  const g = useTranslations('General');
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState<string>(
    t('registerFailedDescription'),
  );
  const status = useSelector(selectCurrentSignUpStatus);
  const dispatch = useDispatch();
  const [form] = useForm();
  const router = useRouter();

  const onFinish: FormProps<AccountSignUp>['onFinish'] = async (values) => {
    const accountSignUp = pick(values, [
      'fullName',
      'username',
      'email',
      'password',
      'rePassword',
    ]);
    if (accountSignUp.password !== accountSignUp.rePassword) {
      setDescription(t('rePasswordNotMatch'));
      setModalVisible(true);
      return;
    }
    const resultAction = await dispatch(signUpAsync(accountSignUp));
    if (signUpAsync.fulfilled.match(resultAction)) {
      router.push({
        pathname: '/explore',
      });
    } else {
      setModalVisible(true);
    }
  };

  const onFinishFailed: FormProps<AccountSignUp>['onFinishFailed'] = (
    errorInfo,
  ) => errorInfo;
  return (
    <div>
      <ModalView
        visible={modalVisible}
        setVisible={setModalVisible}
        cancelText={g('close')}
        description={description}
      />
      <Flex
        vertical
        align="center"
        justify="center"
        className="overflow-hidden relative pb-20 w-full h-[100vh] mt-5"
      >
        <Form
          name="signUpForm"
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
              {t('registerChatAccount')}
            </span>
            <Flex vertical>
              <Form.Item
                label={t('fullName')}
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: t('fullNameRequiredValidation'),
                  },
                  {
                    pattern: /^[a-zA-Z\s-]+$/,
                    message: t('fullNamePatternValidation'),
                  },
                ]}
              >
                <Input maxLength={50} placeholder={t('fullName')} />
              </Form.Item>

              <Form.Item
                label={t('username')}
                name="username"
                rules={[
                  {
                    required: true,
                    message: t('usernameRequiredValidation'),
                  },
                ]}
              >
                <Input maxLength={100} placeholder={t('username')} />
              </Form.Item>

              <Form.Item
                label={t('email')}
                name="email"
                rules={[
                  { type: 'email', message: t('emailFormatValidation') },
                  { required: true, message: t('emailRequiredValidation') },
                ]}
              >
                <Input maxLength={50} placeholder={t('email')} />
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

              <Form.Item
                label={t('rePassword')}
                name="rePassword"
                rules={[
                  {
                    required: true,
                    message: t('rePasswordRequiredValidation'),
                  },
                ]}
              >
                <Input.Password maxLength={50} placeholder={t('rePassword')} />
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
                    {t('openAccountNow')}
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
