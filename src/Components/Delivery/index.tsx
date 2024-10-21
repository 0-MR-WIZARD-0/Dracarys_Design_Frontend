import styles from "@/Components/Delivery/delivery.module.scss";

const Delivery = () => {
  return (
    <section>
      <div className={styles.wrapper_delivery}>
        <div>
          <div>
            <h2>Доставка</h2>
          </div>
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