import type { BlogCategorySeed, BlogPostSeed } from "../types";

export const trBlogCategories: BlogCategorySeed[] = [
  {
    translation_key: "kaygi",
    slug: "kaygi",
    name: "Kaygı",
    description: "Kaygının nasıl çalıştığı, hangi döngülerle sürdüğü ve neyin işe yaradığı üzerine yazılar.",
    order_index: 1,
  },
  {
    translation_key: "sinav-sureci",
    slug: "sinav-sureci",
    name: "Sınav Süreci",
    description: "Sınav hazırlığında motivasyon, çalışma düzeni ve performans baskısı üzerine yazılar.",
    order_index: 2,
  },
  {
    translation_key: "ebeveynlik",
    slug: "ebeveynlik",
    name: "Ebeveynlik",
    description: "Çocuk ve ergenle iletişim, sınır koyma ve geçiş dönemleri üzerine yazılar.",
    order_index: 3,
  },
  {
    translation_key: "ozsaygi",
    slug: "ozsaygi",
    name: "Özsaygı",
    description: "Kendilik algısı, iç eleştirel ses ve kendine yönelik dil üzerine yazılar.",
    order_index: 4,
  },
  {
    translation_key: "iliskiler",
    slug: "iliskiler",
    name: "İlişkiler",
    description: "İletişim, sınırlar ve yakın ilişkilerde tekrar eden örüntüler üzerine yazılar.",
    order_index: 5,
  },
  {
    translation_key: "psikolojik-iyi-olus",
    slug: "psikolojik-iyi-olus",
    name: "Psikolojik İyi Oluş",
    description: "Gündelik hayatta ruhsal iyi oluşu destekleyen alışkanlıklar ve yaklaşımlar.",
    order_index: 6,
  },
  {
    translation_key: "gunluk-yasam",
    slug: "gunluk-yasam",
    name: "Günlük Yaşam",
    description: "Rutin, motivasyon ve gündelik hayatın içinde küçük ama sürdürülebilir değişiklikler.",
    order_index: 7,
  },
];

export const trBlogPosts: BlogPostSeed[] = [
  {
    translation_key: "sinav-kaygisi-calismayi-surdurmek",
    slug: "sinav-kaygisiyla-calismayi-surdurmek",
    title: "Sınav kaygısıyla çalışmayı sürdürmek",
    excerpt:
      "Sınav döneminde kaygıyı tamamen ortadan kaldırmak gerçekçi bir hedef değil. Asıl soru şu: kaygı yüksekken çalışmayı nasıl sürdürebiliriz?",
    category_key: "sinav-sureci",
    published_at: "2025-02-11",
    seo_title: "Sınav Kaygısıyla Çalışmayı Sürdürmek | Ecesu Karslı",
    seo_description:
      "Sınav kaygısı çalışmayı nasıl zorlaştırır, erteleme döngüsü nasıl kurulur ve kaygı yüksekken çalışmayı sürdürmek için neler yapılabilir?",
    content: `Sınav dönemine dair en sık duyduğum cümlelerden biri şu: "Kaygılanmayı bıraksam çalışabileceğim." Bu cümle mantıklı görünür ama pratikte ters çalışır. Çünkü kaygıyı bir ön koşula dönüştürdüğümüzde, çalışmaya başlamak için hiç gelmeyecek bir ana bağımlı hale geliriz.

Daha işe yarar soru şudur: **kaygı yüksekken çalışmayı nasıl sürdürebilirim?**

## Kaygının işlevi ve sınırı

Kaygı, bir tehdit ihtimali karşısında bedeni hazırlayan bir sistemdir. Sınav gibi sonucu belirsiz ve değerlendirme içeren durumlarda devreye girmesi beklenir. Belirli bir düzeyde kaygı dikkati toplar, hazırlığı destekler.

Sorun, kaygının düzeyinde değil; kaygıya verdiğimiz tepkide başlar. Kaygı yükseldiğinde çoğu kişi iki şeyden birini yapar: ya konuyu tamamen erteler ya da saatlerce masada oturup verimsiz bir şekilde "çalışıyor" görünür. Her iki durumda da kaygı kısa süreliğine azalır, sonra daha güçlü döner.

## Erteleme döngüsü nasıl kurulur?

Döngü genellikle şöyle işler:

1. Zor bir konuyu açarsınız.
2. "Bunu anlamıyorum, zaten yetişmez" düşüncesi belirir.
3. Huzursuzluk artar.
4. Telefona uzanırsınız; huzursuzluk anında düşer.
5. Bir süre sonra suçluluk gelir ve "yeterince çalışmıyorum" düşüncesi güçlenir.

Dikkat edin: dördüncü adım işe yarıyor. Kaçınma gerçekten rahatlatıyor. Bu yüzden döngü kendini tekrar ediyor. Döngüyü kırmak için rahatlamanın kaynağını değiştirmek gerekir.

## Kaygı yüksekken çalışmayı sürdürmek

### Küçük ve tanımlı başlangıç

"Bugün matematik çalışacağım" belirsiz bir hedeftir ve kaygıyı besler. "Şu üniteden 10 soru çözeceğim" tanımlıdır, bitişi bellidir. Başlama eşiğini düşüren şey, hedefin küçüklüğü değil netliğidir.

### Süreyi değil, bloğu planlayın

Kaygı yüksekken uzun bloklar kurmak zordur. 25-30 dakikalık çalışma blokları ve aralarında kısa molalar, çoğu öğrenci için sürdürülebilir bir yapı sağlar. Önemli olan molada ekrana dönmemek; kısa bir yürüyüş ya da su içmek, dikkati gerçekten dinlendirir.

### Deneme sonucunu veri olarak okuyun

Deneme sınavı bir değerlendirme değil, bir ölçüm aracıdır. "Kötü geçti" yerine "hangi konularda ve hangi tür sorularda kayıp var?" sorusu, sonucu kullanılabilir hale getirir. Bu geçiş kulağa küçük gelir ama motivasyon üzerindeki etkisi büyüktür.

### Mükemmeliyetçiliği fark edin

"Bir konuyu tam anlamadan diğerine geçemem" düşüncesi çoğu zaman koruyucu bir cümledir; hata yapma ihtimalinden korur. Ancak sınav hazırlığında ilerlemeyi durdurur. Bir konuyu %70 anlayıp devam etmek, %100'ü bekleyip hiç ilerlememekten çoğu zaman daha verimlidir.

### Bedeni hesaba katın

Uyku süresi kısaldığında kaygı eşiği düşer. Sınav döneminde uykudan kısmak, kısa vadede kazanılan saatleri uzun vadede fazlasıyla geri verir. Aynı şey düzenli öğün ve hareket için de geçerli.

## Sınav günü için

Sınav sabahı yeni konu çalışmak, kaygıyı yükseltmekten başka işe yaramaz. O gün için işe yarayan şeyler daha basittir: tanıdık bir rutin, erken çıkmak, sınav öncesi birkaç dakikalık yavaş nefes çalışması ve soruların arasında takıldığınızda geçme iznini kendinize baştan vermek.

Nefes çalışması için basit bir yöntem: dört saniye burundan alın, altı saniyede ağızdan verin. Verişin alıştan uzun olması, bedene sakinleşme sinyali verir. Birkaç dakika yeterlidir.

## Ne zaman destek almak yararlı olur?

Kaygı; uyku düzenini belirgin biçimde bozuyorsa, çalışmayı haftalarca durduruyorsa, sınav düşüncesiyle bedensel belirtiler (mide bulantısı, çarpıntı, baş dönmesi) yoğun şekilde ortaya çıkıyorsa ya da sınava girmeme fikri güçleniyorsa, bu tabloyla tek başına uğraşmak zorunda değilsiniz.

Sınav dönemi kaygısıyla nasıl çalıştığımı [Sınav Dönemi Kaygısı](/tr/calisma-alanlari/sinav-kaygisi) sayfasında ayrıntılı olarak anlattım. Ebeveynlerin bu süreçte nasıl destek olabileceği ise [Ebeveyn Danışmanlığı](/tr/calisma-alanlari/ebeveyn-danismanligi) başlığının konusu.

Kaygının nasıl bir döngüyle sürdüğünü daha genel olarak okumak isterseniz, [kaygı döngüsü üzerine yazdığım yazıya](/tr/blog/kaygi-dongusu-nasil-calisir) göz atabilirsiniz.`,
  },
  {
    translation_key: "kaygi-dongusu",
    slug: "kaygi-dongusu-nasil-calisir",
    title: "Kaygı döngüsü nasıl çalışır?",
    excerpt:
      "Kaygıyı azaltmak için yaptığımız bazı şeyler, uzun vadede onu güçlendirir. Bu yazıda döngünün nasıl kurulduğunu ve nerede gevşediğini anlatıyorum.",
    category_key: "kaygi",
    published_at: "2025-03-04",
    seo_title: "Kaygı Döngüsü Nasıl Çalışır? | Ecesu Karslı",
    seo_description:
      "Kaçınma ve güvence arama davranışları kaygıyı nasıl sürdürür? Kaygı döngüsünün işleyişi ve döngünün nerede gevşediği üzerine bir yazı.",
    content: `Kaygı, geleceğe dair bir tehdit ihtimaline verilen tepkidir. Henüz olmamış bir şeyin olabileceğini düşünürüz ve beden buna hazırlanır. Bu haliyle kaygı bir arıza değil, işlevsel bir sistemdir.

Zorlayıcı hale gelen şey, kaygının kendisinden çok onu yönetmek için kurduğumuz döngüdür.

## Döngünün dört adımı

### 1. Tetikleyici

Bir düşünce, bedensel bir duyum ya da dışarıdan bir uyaran. Kalp atışındaki bir değişiklik, gelen bir e-posta, kalabalık bir ortam.

### 2. Yorum

Tetikleyiciye bir anlam yükleriz: "Bir sorun var", "rezil olacağım", "yetiştiremeyeceğim". Bu yorum çoğu zaman otomatiktir; farkına bile varmadan yaparız.

### 3. Kaygı yükselir

Beden hazırlanır: kalp hızlanır, kaslar gerilir, dikkat daralır ve tehdide odaklanır. Bu noktada düşünceler daha da hızlanır.

### 4. Güvenlik davranışı

Kaygıyı düşürmek için bir şey yaparız: ortamdan uzaklaşırız, belirtiyi kontrol ederiz, birine sorarız, planı erteleriz, defalarca kontrol ederiz.

Ve burada kritik nokta gelir: **bu davranış işe yarar.** Kaygı gerçekten düşer. Ama düştüğü için beyin şu dersi çıkarır: "Tehlike vardı, ben de doğru olanı yaptım." Böylece bir sonraki seferde yorum daha da güçlenir.

## Kısa vadeli rahatlama, uzun vadeli sürdürme

Kaygı döngüsünün en kafa karıştırıcı yanı budur. Bize iyi gelen şeyler döngüyü besler:

- **Kaçınma**: Kaygı uyandıran durumdan uzak durmak. Sunum yapmamak, kalabalık ortama girmemek, konuşmayı ertelemek.
- **Güvence arama**: "Sence bir şey var mı?" diye sormak, internette belirti aramak, aynı soruyu farklı kişilere sormak.
- **Aşırı kontrol**: Kapıyı defalarca kontrol etmek, mesajı göndermeden önce onlarca kez okumak, bedeni sürekli yoklamak.
- **Aşırı hazırlık**: Riski sıfırlamak için gereğinden fazla plan yapmak; bu da hiç harekete geçmemekle sonuçlanabilir.

Bunların hiçbiri "yanlış" davranışlar değil. Hepsi anlaşılır. Sorun, tekrarlandıkça kaygının hareket alanını genişletmeleri.

## Döngü nerede gevşer?

### Yorumu görünür kılmak

Kaygı yükseldiğinde çoğu zaman düşünceyi değil, sonucu fark ederiz. "Gerginim" deriz ama hangi cümlenin bu gerginliği başlattığını bilmeyiz. Kaygı yükseldiği anda "şu an aklımdan geçen cümle neydi?" diye sormak, döngüyü yavaşlatan ilk adımdır.

### Kesinlik yerine olasılık

"Kesin kötü bir şey olacak" cümlesini "bu olabilir ama başka ihtimaller de var" cümlesine çevirmek, iyimserlik değil gerçekçiliktir. Amaç kendini kandırmak değil; tek bir senaryoya kilitlenmiş dikkati genişletmek.

### Güvenlik davranışını kademeli azaltmak

Kontrol etme davranışını bir anda bırakmak gerekmez ve çoğu zaman sürdürülebilir olmaz. Sıklığını kademeli azaltmak daha işe yarar: günde on kez kontrol ediyorsanız önce sekize, sonra beşe. Her adımda kaygının yükselip bir süre sonra kendiliğinden düştüğünü deneyimlemek, döngünün gevşemesini sağlayan asıl öğrenmedir.

### Belirsizliğe tahammülü çalışmak

Kaygının çekirdeğinde çoğu zaman belirsizlik vardır. "Emin olmak" hedefine ulaşmak mümkün olmadığından, çalışma daha çok "emin olmadan da devam edebilme" üzerine kurulur.

## Bu ne zaman kendi başına aşılabilir, ne zaman destek gerekir?

Kaygı gündelik hayatın akışını belirgin şekilde daraltıyorsa; iş, okul veya ilişkilerde kaçındığınız alanlar artıyorsa; uyku ve iştah düzeniniz uzun süredir bozuksa, bu döngüyle tek başına uğraşmak yorucu hale gelir.

Bedensel belirtilere odaklanmanın öne çıktığı durumlarda [Sağlık Kaygısı](/tr/calisma-alanlari/saglik-kaygisi) sayfası; sınav ve performans bağlamında yükselen kaygı içinse [Sınav Dönemi Kaygısı](/tr/calisma-alanlari/sinav-kaygisi) sayfası bu döngünün nasıl ele alındığını ayrıntılandırıyor.`,
  },
  {
    translation_key: "ic-elestirel-ses",
    slug: "icimizdeki-elestirel-ses",
    title: "İçimizdeki eleştirel ses ve özsaygı",
    excerpt:
      "Kendimize konuşma biçimimiz, çoğu zaman başkalarına kurmayacağımız cümlelerden oluşur. Bu sesin nereden geldiğini ve nasıl değiştiğini anlatıyorum.",
    category_key: "ozsaygi",
    published_at: "2025-04-08",
    seo_title: "İçimizdeki Eleştirel Ses ve Özsaygı | Ecesu Karslı",
    seo_description:
      "İç eleştirel ses nasıl oluşur, özsaygıyı nasıl etkiler ve kendine yönelik daha dengeli bir dil nasıl geliştirilir?",
    content: `Danışanlarıma bazen şunu sorarım: "Bu cümleyi yakın bir arkadaşınıza kurar mıydınız?" Cevap neredeyse her zaman aynıdır: "Tabii ki hayır."

Kendimize konuşma biçimimiz, çoğu zaman kimseye kurmayacağımız cümlelerden oluşur. Bu sese literatürde **iç eleştirel ses** deniyor.

## Bu ses nereden geliyor?

İç eleştirel ses doğuştan gelmez; öğrenilir. Erken dönemde duyduğumuz geri bildirimler, aile içinde başarının nasıl konuşulduğu, okulda hatanın nasıl karşılandığı — bunların hepsi bu sesin tonunu biçimlendirir.

Bir çocuk için, bakım verenin beklentisine uymak güvende kalmanın yoludur. Bu nedenle çocuk, dışarıdan gelen eleştiriyi zamanla içselleştirir. Kendi kendini uyaran bir sistem kurar. O sistem başlangıçta koruyucudur: "Önce ben fark edersem, dışarıdan gelen darbe daha az acıtır."

Yetişkinlikte ise bu koruma çoğu zaman işlevini yitirir ve maliyeti artar.

## Gündelik hayatta nasıl görünür?

- Bir işi tamamladığınızda önce eksik yönünü fark etmek
- Övgüyü "abartıyorlar" diye geçiştirmek
- Küçük bir hatayı günlerce zihinde tekrar etmek
- Bir isteği dile getirmeden önce onlarca kez cümleyi kurmak
- Sosyal medyada karşılaştırma sonrası ruh halinde belirgin düşüş
- "Hayır" dedikten sonra uzun süre suçluluk hissetmek

Bu belirtiler, kişinin gerçekten yetersiz olmasıyla ilgili değildir. Yüksek başarı gösteren kişilerde de sıklıkla görülür; hatta bazen başarı, bu sesin "işe yaradığına" dair yanlış bir kanıt olarak okunur.

## "Kendine güven" telkini neden işe yaramaz?

Özsaygı, kişiye söylenen olumlu cümlelerle kurulmaz. Bir kişiye "kendine güven" demek, kendini yetersiz hisseden birine "hissetme" demekten farksızdır. Çünkü sorun bilgi eksikliği değil, öğrenilmiş bir ilişki biçimidir.

Bu nedenle çalışma, telkinle değil, sesin işleyişini anlamakla başlar.

## Sesle çalışmanın adımları

### 1. Sesi duyulur hale getirmek

İlk adım, cümleleri yazılı hale getirmektir. Kaygı ya da yetersizlik hissinin yükseldiği anda aklınızdan geçen cümleyi olduğu gibi not almak. Bu basit görünür ama sesi "arka plan gürültüsü" olmaktan çıkarıp incelenebilir bir metne dönüştürür.

### 2. Kaynağını sormak

"Bu cümle kimin sesine benziyor?" sorusu çoğu zaman şaşırtıcı cevaplar verir. Ses bazen bir öğretmene, bazen bir ebeveyne, bazen belirli bir dönemin ortamına aittir.

### 3. İşlevini anlamak

Eleştirel ses genellikle bir şeyi korumaya çalışır: reddedilmekten, hayal kırıklığına uğramaktan, aynı hatayı tekrarlamaktan. İşlevi anlaşıldığında ses "düşman" olmaktan çıkar; bu da onu yumuşatmayı kolaylaştırır.

### 4. Dengeli bir alternatif kurmak

Amaç, sert cümlenin yerine abartılı bir övgü koymak değildir. "Harikayım" cümlesi, "berbatım" kadar gerçek dışıdır ve inandırıcı gelmez. İşe yarayan cümle genellikle daha ölçülüdür: "Bu sunumda birkaç yerde takıldım, ama içeriği aktarabildim. Bir sonraki için geçişleri çalışabilirim."

### 5. Davranış düzeyinde denemek

Özsaygı, çoğunlukla düşünceden önce davranışla değişir. Küçük bir sınır koymak, bir isteği dile getirmek, bir övgüyü "teşekkür ederim" diyerek kabul etmek. Her deneme, sese karşı yeni bir kanıt üretir.

## Bu değişim ne kadar sürer?

Yıllar içinde kurulmuş bir ilişki biçiminin birkaç haftada değişmesini beklemek gerçekçi değildir. Ancak sesin fark edilmesi bile ilk aşamada belirgin bir rahatlama sağlar; çünkü kişi artık o cümlelerle özdeşleşmek yerine onlara dışarıdan bakabilir.

Bu başlıkta nasıl çalıştığımı [Özsaygı ve Kendilik Algısı](/tr/calisma-alanlari/ozsaygi) sayfasında ayrıntılı olarak anlattım. Eleştirel sesin yoğun olduğu dönemlerde kaygının da yükselmesi sıktır; [kaygı döngüsü üzerine yazı](/tr/blog/kaygi-dongusu-nasil-calisir) bu ikisinin nasıl birbirini beslediğini anlamaya yardımcı olabilir.`,
  },
];
