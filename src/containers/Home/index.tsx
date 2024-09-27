import Image from 'next/image';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

export default async function Home() {
  return (
    <Flex
      vertical
      justify="center"
      align="start"
      className="relative overflow-hidden bg-cover bg-no-repeat h-screen px-16 py-20 w-full max-md:px-5 max-md:max-w-full"
      style={{
        backgroundImage: 'url("/images/LandingPageBackground.jpg")',
      }}
    >
      <Image
        src="/images/TalkieLogo.png"
        alt="banner"
        width="0"
        height="0"
        sizes="100vw"
        className="w-[147px] h-auto object-contain absolute top-5"
      />
      <Flex vertical>
        <p className="text-zinc-50 text-xl">
          🌍 Kết Nối Mọi Nơi: Trò chuyện mọi lúc, mọi nơi với chỉ một chiếc điện
          thoại!
        </p>
        <p className="text-zinc-50 text-xl mt-2">
          ✨ Tìm Kiếm Dễ Dàng: Lục tìm những cuộc trò chuyện cũ chỉ với một cú
          nhấp chuột. Không còn loay hoay tìm kiếm thông tin!
        </p>
        <p className="text-zinc-50 text-xl mt-2">
          🚀 Luôn Cập Nhật: Chúng tôi liên tục cải tiến và phát triển để mang
          đến cho bạn những trải nghiệm trò chuyện tuyệt vời nhất!
        </p>
      </Flex>
      <Button
        href="/vi/sign-up"
        size="large"
        icon={<ArrowRightOutlined />}
        iconPosition="end"
        block={false}
        className="mt-7"
      >
        Đăng ký ngay
      </Button>
    </Flex>
  );
}
