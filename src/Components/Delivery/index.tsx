import styles from "@/Components/Delivery/delivery.module.scss";
import card from "@/app/assets/card.svg"
import Image from "next/image";

const Delivery = () => {
  return (
    <section className={styles.section4}>
      <div className={styles.wrapper_delivery}>
        <div className={styles.card}>
          <Image src={card} alt="card"/>
          {/* <div className={styles.portal_frame}>
            <div className={styles.portal}></div>
          </div> */}
        </div>
        <div className={styles.title}>
            <h2>Доставка</h2>
            <hr/>
        </div>
          <p>Все заказы доставляются в фирменной упаковке нашего бренда.
            Мы уделяем внимание каждому этапу подготовки заказа
            для передачи его клиенту, чтобы обеспечить сохранность
            и презентабельный вид. 
            <br/><br/>
            Вместе с товаром вы получаете фирменный конверт с индивидуальной запиской 
            от DD и рекомендациями по уходу за изделием, включая информацию о правильной стирке, 
            сушке и хранении кастомных вещей.
            <br/><br/>
            Доставка осуществляется через логистическую службу СДЭК. 
            Стоимость доставки включена в общий счет вашего заказа, 
            и вам не нужно беспокоиться о дополнительных расходах. 
            Мы гарантируем безопасную и своевременную доставку 
            вашего заказа до ближайшего к вам пункта выдачи или прямо на ваш адрес.
          </p>
      </div>
    </section>
  )
}

export default Delivery