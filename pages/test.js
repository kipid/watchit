import Image from "next/image";

export default function Test() {
  return (
    <>
      <img
        src="/images/product.jpeg"
        width="120"
        height="120"
        alt="상품 이미지"
      />
			<Image
        width="120"
        height="120"
        src="/images/product.jpeg"
        alt="상품 이미지"
				style={{ objectFit: 'cover' }}
      />
    </>
  );
}
