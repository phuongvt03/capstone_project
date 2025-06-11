import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-slate-900/70 z-10"></div>
          <img
            src="https://th.bing.com/th/id/R.567d02e98bf43071acb6c9bcac048153?rik=cdEGJDiZtd7Meg&riu=http%3a%2f%2fsonghinh.phuyen.gov.vn%2fupload%2f63908%2f20201218%2fHo_doi_1_-_Le_Ba_Hung_54676cf608.jpg&ehk=GPl3uZnLiLfFgIPzZhhoXNa4SRRC4WrSRejH%2fQ5%2bKPI%3d&risl=&pid=ImgRaw&r=0.jpg"
            alt="Thiết bị đo chất lượng nước tại ao hồ thủy sản"
            className="object-cover w-full h-full"
            width={1920}
            height={1080}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white text-center md:text-left py-12">
          <div className="max-w-3xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Giải pháp giám sát chất lượng nước thông minh cho{" "}
              <span className="text-red-500">ao nuôi thủy sản</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-200">
              Hệ thống đo chất lượng nước của chúng tôi được thiết kế chuyên
              biệt cho ao hồ nuôi thủy sản, giúp giám sát và kiểm soát môi
              trường nước một cách chính xác và hiệu quả, đảm bảo điều kiện sống
              tối ưu cho tôm, cá và các loại thủy sản khác.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/login"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 text-center text-sm sm:text-base"
              >
                Đăng nhập
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 text-center text-sm sm:text-base"
              >
                Liên hệ ngay
              </Link>
              <Link
                href="/solutions"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 text-center text-sm sm:text-base"
              >
                Tìm hiểu thêm
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 text-center text-sm sm:text-base"
              >
                Xem thiết bị
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden sm:block">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </section>

      {/* Quy trình hoạt động */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            Quy trình hoạt động đơn giản
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-red-600 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-3">
                <span className="text-red-600 text-lg sm:text-xl font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-center">
                Lắp đặt thiết bị đo
              </h4>
              <p className="text-gray-600 text-center text-sm">
                Tư vấn lựa chọn thiết bị phù hợp với loại hình và quy mô ao hồ
                thủy sản (nuôi tôm, cá, hoặc các loại thủy sản khác).
              </p>
              <p className="text-gray-600 text-center text-sm mt-2">
                Cấu hình hệ thống kết nối với trung tâm giám sát hoặc nền tảng
                đám mây để truyền dữ liệu thời gian thực.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-red-600 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-3">
                <span className="text-red-600 text-lg sm:text-xl font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-center">
                Giám sát thông minh
              </h4>
              <p className="text-gray-600 text-center text-sm">
                Phân tích dữ liệu ngay trên thiết bị hoặc trên nền tảng đám mây
                bằng các thuật toán cảnh báo thông minh, dựa trên các ngưỡng an
                toàn được thiết lập riêng cho từng loại thủy sản.
              </p>
              <p className="text-gray-600 text-center text-sm mt-2">
                Hiển thị thông tin trực quan trên ứng dụng/web, cho phép người
                quản lý dễ dàng theo dõi biến động chất lượng nước theo thời
                gian thực và lịch sử.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-red-600 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-3">
                <span className="text-red-600 text-lg sm:text-xl font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-center">
                Cảnh báo & xử lý
              </h4>
              <p className="text-gray-600 text-center text-sm">
                Gửi cảnh báo ngay lập tức cho người quản lý ao hồ khi các thông
                số vượt ngưỡng an toàn, hỗ trợ xử lý kịp thời nhằm bảo vệ sức
                khỏe thủy sản.
              </p>
              <p className="text-gray-600 text-center text-sm mt-2">
                Hệ thống cung cấp báo cáo định kỳ (ngày, tuần, tháng) giúp người
                quản lý nhìn nhận tổng quan về tình trạng môi trường nước ao hồ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Giới thiệu về giải pháp đo chất lượng nước
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Hệ thống đo chất lượng nước của chúng tôi được thiết kế chuyên
              biệt cho ao hồ nuôi thủy sản, giúp giám sát và kiểm soát môi
              trường nước một cách chính xác và hiệu quả, đảm bảo điều kiện sống
              tối ưu cho tôm, cá và các loại thủy sản khác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="images/auth2.jpg"
                alt="Thiết bị đo chất lượng nước"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Tại sao chọn giải pháp đo chất lượng nước của chúng tôi?
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Chúng tôi cung cấp giải pháp đo chất lượng nước tiên tiến bằng
                thuyền tự động gắn thiết bị cảm biến, giúp người nuôi thủy sản
                theo dõi môi trường ao hồ một cách toàn diện, chính xác và tiết
                kiệm công sức.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Đo đa điểm linh hoạt trên toàn bộ ao hồ, đảm bảo dữ liệu
                    phản ánh đúng thực trạng môi trường nước
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Cảnh báo sớm khi phát hiện thông số vượt ngưỡng an toàn, bảo
                    vệ sức khỏe tôm cá kịp thời
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span className="text-gray-700 text-sm sm:text-base">
                    Kết nối thời gian thực với điện thoại hoặc máy tính, dễ dàng
                    theo dõi và quản lý từ xa
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
