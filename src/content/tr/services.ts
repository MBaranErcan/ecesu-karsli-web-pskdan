import type { ServiceSeed } from "../types";

export const trServices: ServiceSeed[] = [
  {
    translation_key: "sinav-kaygisi",
    slug: "sinav-kaygisi",
    title: "Sınav Dönemi Kaygısı",
    short_description:
      "Sınav sürecinde artan kaygı, performans baskısı ve motivasyon dalgalanmalarıyla çalışıyoruz.",
    summary:
      "Sınav dönemleri; hazırlık yükünün, beklentilerin ve belirsizliğin aynı anda arttığı dönemlerdir. Kaygının bir miktarı doğaldır ve kişiyi harekete geçirir. Ancak kaygı, çalışmayı sürdürmeyi zorlaştıracak düzeye ulaştığında süreç yorucu hale gelebilir.",
    who_for: [
      "Sınava hazırlanırken yoğun gerginlik ve huzursuzluk hissedenler",
      "Çalışmaya oturduğunda odaklanmakta zorlanan öğrenciler",
      "Deneme sonuçlarından sonra motivasyonu belirgin şekilde düşenler",
      "Sınav öncesi uyku düzeni ve iştahı değişenler",
      "Çocuğunun sınav sürecinde nasıl destek olacağını merak eden ebeveynler",
    ],
    process_items: [
      "Kaygının hangi anlarda ve nasıl ortaya çıktığının birlikte incelenmesi",
      "Sınavla ilgili düşünce döngülerinin fark edilmesi ve esnetilmesi",
      "Çalışma düzeninin kişinin gerçek kapasitesine göre planlanması",
      "Erteleme ve mükemmeliyetçilik döngüsünün ele alınması",
      "Sınav günü için uygulanabilir sakinleşme becerileri",
    ],
    body: `## Sınav kaygısı nedir?

Sınav kaygısı, sınav ya da değerlendirme içeren durumlar öncesinde ve sırasında ortaya çıkan yoğun gerginlik halidir. Kişide hem düşünce düzeyinde ("yapamayacağım", "her şeyi unutacağım") hem de bedensel düzeyde (kalp atışının hızlanması, mide rahatsızlığı, uyku düzeninin bozulması) etkiler görülebilir.

Kaygının kendisi bir sorun değildir; belirli bir düzeyde kaygı odaklanmayı ve hazırlığı destekler. Zorlayıcı hale gelen kısım, kaygının çalışmayı sürdürmeyi engellediği, kişiyi kaçınmaya ya da sürekli erteleme döngüsüne ittiği noktadır.

## Süreçte neler ele alınabilir?

Görüşmelerde önce mevcut tablo birlikte anlaşılır: kaygı hangi anlarda yükseliyor, hangi düşünceler eşlik ediyor, hangi davranışlar bu döngüyü sürdürüyor. Ardından kişiye özel bir çalışma planı oluşturulur.

Sıklıkla üzerinde durulan başlıklar şunlardır:

- Performansla ilgili katı beklentilerin ve "her şeyi bilmeliyim" düşüncesinin gözden geçirilmesi
- Deneme sınavı sonuçlarının nasıl yorumlandığı
- Erteleme davranışının altındaki duygunun anlaşılması
- Çalışma-dinlenme dengesinin yeniden kurulması
- Sınav anında kullanılabilecek nefes ve dikkat toplama teknikleri

## Ebeveynlerin rolü

Sınav sürecinde ebeveynlerin tutumu, öğrencinin yaşadığı baskının şiddetini etkileyebilir. İhtiyaç duyulduğunda ebeveynlerle ayrı görüşmeler planlanabilir; iletişim dili, beklentilerin ifade ediliş biçimi ve destek olma yolları üzerine çalışılır.

## Görüşme biçimi

Sınav dönemi kaygısıyla ilgili görüşmeler Ankara'da yüz yüze ya da online olarak yürütülebilir. Yoğun hazırlık dönemlerinde online görüşmeler, yol süresini ortadan kaldırdığı için sıklıkla tercih edilmektedir.`,
    order_index: 1,
    featured: true,
    seo_title: "Sınav Kaygısı Danışmanlığı | Ankara ve Online",
    seo_description:
      "Sınav dönemi kaygısı, performans baskısı ve motivasyon kaybı üzerine psikolojik danışmanlık. Ankara'da yüz yüze ve online görüşme seçenekleri.",
  },
  {
    translation_key: "ebeveyn-danismanligi",
    slug: "ebeveyn-danismanligi",
    title: "Ebeveyn Danışmanlığı",
    short_description:
      "Çocuğunuzla iletişiminizde zorlandığınız dönemlerde birlikte düşünebileceğimiz bir alan.",
    summary:
      "Ebeveynlik, hazır bir kılavuzu olmayan bir süreçtir. Çocuğun gelişim dönemleri değiştikçe ihtiyaçları da değişir ve daha önce işe yarayan yaklaşımlar yetersiz kalabilir. Ebeveyn danışmanlığı, bu geçişlerde yalnız hissetmemek için bir alan sunar.",
    who_for: [
      "Çocuğuyla iletişiminde tekrar eden zorlanmalar yaşayan ebeveynler",
      "Sınır koyma ve kural belirleme konusunda kararsız kalanlar",
      "Ergenlik dönemine geçişte iletişim dilini gözden geçirmek isteyenler",
      "Kardeş ilişkileri, ekran süresi ya da okul süreçlerinde zorlananlar",
      "Boşanma, taşınma, kayıp gibi geçiş dönemlerinde çocuğunu desteklemek isteyenler",
    ],
    process_items: [
      "Ailenin gündelik akışının ve zorlanma anlarının anlaşılması",
      "Çocuğun gelişim dönemine uygun beklentilerin birlikte belirlenmesi",
      "İletişim dilinin ve sınır koyma biçimlerinin ele alınması",
      "Ebeveynin kendi duygusal yükünün konuşulabilmesi",
      "Uygulanabilir, küçük ve sürdürülebilir adımların planlanması",
    ],
    body: `## Ebeveyn danışmanlığı nedir?

Ebeveyn danışmanlığı, çocuğun kendisine yönelik bir terapi süreci değildir. Görüşmeler ebeveynle yürütülür ve odak; ebeveynin çocuğuyla kurduğu ilişki, iletişim biçimi ve zorlandığı anlarda kullanabileceği yaklaşımlardır.

Bazı durumlarda çocukla doğrudan çalışmak gerekebilir. Böyle bir ihtiyaç görüldüğünde bu açıkça konuşulur ve uygun yönlendirme yapılır.

## Hangi konular konuşulur?

Görüşmelerde en sık ele alınan başlıklar arasında şunlar bulunur:

- Tekrar eden çatışma anlarının nasıl büyüdüğünün incelenmesi
- Kural ve sınırların nasıl kurulacağı, tutarlılığın nasıl korunacağı
- Çocuğun davranışının altındaki ihtiyacın anlaşılması
- Okul, akademik beklenti ve sınav dönemlerinde destek olma biçimleri
- Ergenlik döneminde değişen iletişim ihtiyacı
- Ebeveynin kendi çocukluk deneyimlerinin bugünkü tutumlarına etkisi

## Ebeveynin de desteğe ihtiyacı olabilir

Ebeveynlik yalnızca çocuğa dair bir mesele değildir. Yorgunluk, suçluluk hissi, "yeterince iyi yapamıyorum" düşüncesi ya da eşler arasındaki görüş ayrılıkları da sürecin parçasıdır. Görüşmelerde bu yükün konuşulabilmesi için de alan açılır.

## Görüşme biçimi

Ebeveyn danışmanlığı görüşmeleri Ankara'da yüz yüze ya da online olarak yapılabilir. Anne ve babanın birlikte katılmak istediği görüşmeler önceden planlanarak düzenlenebilir.`,
    order_index: 2,
    featured: true,
    seo_title: "Ebeveyn Danışmanlığı | Ankara ve Online",
    seo_description:
      "Çocuğunuzla iletişim, sınır koyma ve geçiş dönemlerinde ebeveyn danışmanlığı. Ankara'da yüz yüze ve online görüşme seçenekleri.",
  },
  {
    translation_key: "saglik-kaygisi",
    slug: "saglik-kaygisi",
    title: "Sağlık Kaygısı",
    short_description:
      "Bedensel belirtilere yoğun odaklanma ve tekrar eden kontrol ihtiyacıyla çalışıyoruz.",
    summary:
      "Bedenimizde fark ettiğimiz değişiklikleri önemsemek doğaldır. Sağlık kaygısı, bu dikkatin gündelik yaşamı zorlaştıracak kadar yoğunlaştığı, kişinin sürekli bir tehlike ihtimalini değerlendirdiği bir döngüye dönüştüğünde konuşulmaya başlar.",
    who_for: [
      "Bedensel belirtileri sık sık ciddi bir hastalık işareti olarak yorumlayanlar",
      "İnternette belirti araştırmaya çok zaman ayıranlar",
      "Tetkik sonuçları iyi geldikten kısa süre sonra yeniden endişelenenler",
      "Yakınlarına sürekli güvence sorma ihtiyacı hissedenler",
      "Sağlıkla ilgili endişeler nedeniyle bazı durumlardan kaçınanlar",
    ],
    process_items: [
      "Endişenin hangi durumlarda yoğunlaştığının birlikte haritalanması",
      "Belirtilerin nasıl yorumlandığının incelenmesi",
      "Kontrol etme ve güvence arama davranışlarının döngüdeki rolü",
      "Belirsizliğe tahammülün kademeli olarak çalışılması",
      "Dikkatin bedene yönelme biçimiyle ilgili beceri çalışmaları",
    ],
    body: `## Sağlık kaygısı nasıl bir deneyimdir?

Sağlık kaygısı yaşayan kişiler genellikle bedenlerini dikkatle izler. Kalp atışındaki bir değişiklik, baş ağrısı ya da ciltteki bir iz, ciddi bir hastalığın işareti olarak yorumlanabilir. Bu yorum kaygıyı yükseltir; yükselen kaygı bedensel belirtileri artırır ve döngü kendini besler.

Bu deneyim, kişinin "abarttığı" ya da "kendi kendine yaptığı" bir durum değildir. Hissedilen belirtiler gerçektir; zorlayıcı olan, bu belirtilere yüklenen anlam ve onu izleyen davranışlardır.

## Kontrol ve güvence arama döngüsü

Kaygıyı azaltmak için yapılan bazı davranışlar kısa vadede rahatlatır, uzun vadede döngüyü sürdürür:

- Belirtileri internette araştırmak
- Aynı bölgeyi tekrar tekrar kontrol etmek
- Yakınlara "sence bir şey var mı?" diye sormak
- Kısa aralıklarla yeni tetkik talep etmek
- Kaygı uyandıran durumlardan kaçınmak

Görüşmelerde bu davranışlar yargılanmadan ele alınır ve kademeli olarak azaltılması üzerine çalışılır.

## Önemli bir sınır

Psikolojik danışmanlık tıbbi bir değerlendirme değildir ve tıbbi tanı ya da tedavinin yerine geçmez. Bedensel belirtilerin öncelikle bir hekim tarafından değerlendirilmesi gerekir. Danışmanlık süreci, tıbbi değerlendirme sonrasında devam eden kaygı döngüsüyle çalışır ve gerektiğinde ilgili uzmanlara yönlendirme yapılır.

## Görüşme biçimi

Görüşmeler Ankara'da yüz yüze ya da online olarak sürdürülebilir.`,
    order_index: 3,
    featured: true,
    seo_title: "Sağlık Kaygısı Danışmanlığı | Ankara ve Online",
    seo_description:
      "Bedensel belirtilere yoğun odaklanma, kontrol etme ve güvence arama döngüsüyle ilgili psikolojik danışmanlık. Ankara'da yüz yüze ve online.",
  },
  {
    translation_key: "ozel-ihtiyacli-cocuk-ailelerine-destek",
    slug: "ozel-ihtiyacli-cocuk-ailelerine-destek",
    title: "Özel İhtiyaçlı Çocukların Ailelerine Destek",
    short_description:
      "Bakım verenlerin duygusal yükü, belirsizlik ve tükenmişlik hissi için bir destek alanı.",
    summary:
      "Özel ihtiyaçlı bir çocuğun bakımını üstlenen ebeveynler; sevgi, sorumluluk, belirsizlik ve yorgunluğu çoğu zaman aynı anda taşır. Bu görüşmelerin odağı çocuğun eğitimi ya da terapisi değil, bakım veren kişinin kendi ihtiyaçlarıdır.",
    who_for: [
      "Bakım sorumluluğunun yoğunluğu nedeniyle kendine zaman ayıramayanlar",
      "Tükenmişlik ve sürekli yorgunluk hisseden ebeveynler",
      "Süreçle ilgili belirsizlik karşısında kaygı yaşayanlar",
      "Suçluluk ya da yetersizlik hissiyle zorlananlar",
      "Eş ilişkisinde ve diğer kardeşlerle dengelenmede zorlanan aileler",
    ],
    process_items: [
      "Bakım verenin gündelik yükünün somut olarak görünür kılınması",
      "Duyguların yargılanmadan ifade edilebileceği bir alan açılması",
      "Tükenmişlik belirtilerinin fark edilmesi",
      "Destek kaynaklarının ve sınırların birlikte gözden geçirilmesi",
      "Küçük ama sürdürülebilir öz bakım adımlarının planlanması",
    ],
    body: `## Bu görüşmeler kimin için?

Bu destek alanı, özel ihtiyaçlı bir çocuğun bakımını üstlenen ebeveynler ve bakım verenler içindir. Görüşmelerde odak çocuğun eğitim programı ya da özel eğitim süreci değil, bakım veren kişinin kendi duygusal deneyimidir.

Birçok ebeveyn, kendi ihtiyaçlarını dile getirmenin "bencillik" olduğunu düşünür. Oysa uzun soluklu bir bakım sürecinde bakım verenin iyi oluşu, sürdürülebilirliğin temel parçasıdır.

## Sıkça konuşulan başlıklar

- Sürekli tetikte olma hali ve dinlenememe
- Geleceğe dair belirsizliğin yarattığı kaygı
- Çevrenin bakışları ve yorumlarıyla baş etme
- Diğer kardeşlerle kurulan ilişkide denge arayışı
- Eşler arasında sorumluluk paylaşımı
- Zaman zaman ortaya çıkan öfke, üzüntü ya da suçluluk duygularının normalleştirilmesi

## Yaklaşım

Görüşmelerde hazır çözümler sunulmaz. Öncelik, bakım verenin deneyiminin anlaşılması ve bu deneyimin yargılanmadan ifade edilebileceği bir alanın kurulmasıdır. Ardından kişinin kendi yaşam koşullarına uygun, gerçekçi adımlar birlikte planlanır.

## Görüşme biçimi

Bakım sorumluluğu nedeniyle zaman planlaması zor olabildiğinden, bu görüşmelerde online seçenek sıklıkla tercih edilir. Ankara'da yüz yüze görüşme de mümkündür.`,
    order_index: 4,
    featured: true,
    seo_title: "Özel İhtiyaçlı Çocukların Ailelerine Psikolojik Destek",
    seo_description:
      "Özel ihtiyaçlı çocukların ebeveynleri ve bakım verenleri için duygusal yük, belirsizlik ve tükenmişlik odaklı psikolojik danışmanlık.",
  },
  {
    translation_key: "anlam-arayisi",
    slug: "anlam-arayisi",
    title: "Yaşamsal Anlam Kaybı",
    short_description:
      "Yönsüzlük, boşluk hissi ve 'ne için?' sorusunun belirginleştiği dönemlerde çalışıyoruz.",
    summary:
      "Hayatın belirli dönemlerinde, dışarıdan bakıldığında her şey yolunda görünse bile içeride bir boşluk hissi belirebilir. Anlam arayışı; bir eksiklik değil, çoğu zaman kişinin kendi değerleriyle yeniden temas kurma ihtiyacının işaretidir.",
    who_for: [
      "Uzun süredir motivasyonunu düşük hisseden kişiler",
      "Mezuniyet, iş değişikliği, taşınma gibi geçiş dönemlerinde olanlar",
      "Rutinin içinde 'bunu neden yapıyorum?' sorusunu sık soranlar",
      "Kayıp ya da büyük bir değişim sonrası yön arayanlar",
      "Başkalarının beklentilerine göre şekillenmiş bir hayat yaşadığını düşünenler",
    ],
    process_items: [
      "Boşluk hissinin hangi alanlarda yoğunlaştığının incelenmesi",
      "Kişisel değerlerin ve önceliklerin birlikte netleştirilmesi",
      "Geçmiş dönemlerdeki anlam kaynaklarının gözden geçirilmesi",
      "Küçük ölçekli, değerlere uygun adımların denenmesi",
      "Kararsızlık ve erteleme döngüsünün ele alınması",
    ],
    body: `## Anlam kaybı nasıl fark edilir?

Anlam kaybı çoğu zaman keskin bir olayla başlamaz. Daha çok, gündelik hayatın içinde yavaşça belirir: eskiden keyif veren şeylerin sıradanlaşması, sabahları isteksizlik, "aslında ne istiyorum bilmiyorum" cümlesinin sık tekrarlanması.

Bu deneyim bir başarısızlık göstergesi değildir. Yaşam dönemleri değiştikçe kişinin ihtiyaçları da değişir; daha önce anlam veren şeyler artık aynı karşılığı vermeyebilir.

## Geçiş dönemleri

Anlam arayışı en çok geçiş dönemlerinde belirginleşir:

- Üniversiteden mezuniyet ve iş hayatına giriş
- Kariyer değişikliği ya da uzun süredir sürdürülen bir işten ayrılma
- İlişkilerde büyük değişimler
- Taşınma, şehir ya da ülke değişikliği
- Kayıp sonrası dönemler

## Süreçte ne yapılır?

Görüşmelerde amaç, kişiye dışarıdan bir "hayat amacı" tanımlamak değildir. Bunun yerine kişinin kendi değerleri, ilgi alanları ve geçmiş deneyimleri üzerinden bir yön çalışması yapılır. Bu çalışma çoğu zaman büyük kararlarla değil, gündelik hayatta denenebilecek küçük değişikliklerle ilerler.

Süreç boyunca kararsızlık, erteleme ve "geç kaldım" düşüncesi gibi sık karşılaşılan zorluklar da ele alınır.

## Görüşme biçimi

Görüşmeler Ankara'da yüz yüze ya da online olarak yürütülebilir.`,
    order_index: 5,
    featured: true,
    seo_title: "Anlam Arayışı ve Yaşamsal Anlam Kaybı Danışmanlığı",
    seo_description:
      "Yönsüzlük, boşluk hissi ve motivasyon kaybı üzerine psikolojik danışmanlık. Geçiş dönemlerinde değerlerle yeniden temas kurma çalışması.",
  },
  {
    translation_key: "ozsaygi",
    slug: "ozsaygi",
    title: "Özsaygı ve Kendilik Algısı",
    short_description:
      "Kendinizle kurduğunuz ilişki, yoğun öz eleştiri ve yetersizlik hissi üzerine çalışıyoruz.",
    summary:
      "Özsaygı, kişinin kendisiyle kurduğu ilişkinin gündelik hayattaki karşılığıdır. Kendine yönelik sert bir iç ses, sürekli karşılaştırma ve onay ihtiyacı; ilişkilerden iş hayatına kadar birçok alanı etkileyebilir.",
    who_for: [
      "İçindeki eleştirel sesin sürekli devrede olduğunu hissedenler",
      "Başarılarını küçümseyen, hatalarını uzun süre düşünenler",
      "Hayır demekte ve sınır koymakta zorlananlar",
      "Onay almadığında değerini sorgulayanlar",
      "Sosyal ortamlarda sürekli değerlendiriliyormuş hissi yaşayanlar",
    ],
    process_items: [
      "İç eleştirel sesin nasıl konuştuğunun fark edilmesi",
      "Bu sesin nereden öğrenilmiş olabileceğinin birlikte incelenmesi",
      "Karşılaştırma ve onay arama davranışlarının ele alınması",
      "Sınır koyma ve ihtiyaç ifade etme üzerine çalışma",
      "Kendine yönelik daha dengeli bir dil geliştirilmesi",
    ],
    body: `## Özsaygı sabit bir özellik değildir

Özsaygı, kişinin sahip olduğu ya da olmadığı bir özellik değil; zaman içinde öğrenilmiş bir kendilik ilişkisidir. Erken dönem deneyimleri, aile içindeki geri bildirimler, okul yaşantısı ve sosyal çevre bu ilişkinin biçimlenmesinde rol oynar.

Bu nedenle özsaygıyla ilgili çalışma, kişiye "kendine güven" telkininde bulunmakla değil; bu ilişkinin nasıl kurulduğunu anlamakla başlar.

## Gündelik hayatta nasıl görünür?

- Bir işi iyi yapmış olsa bile eksik yönlerine odaklanma
- Övgüyü kabul etmekte zorlanma
- Karar verirken sürekli başkalarının görüşüne ihtiyaç duyma
- Reddedilme ihtimali karşısında istekleri dile getirmeme
- Sosyal medyada karşılaştırma sonrası ruh halinde düşüş

## Süreçte neler ele alınır?

Görüşmelerde önce kişinin kendisiyle kurduğu dil incelenir. Hangi durumlarda eleştirel ses devreye giriyor, bu ses kimin sesine benziyor, hangi ihtiyacı korumaya çalışıyor gibi sorular üzerinde durulur.

Ardından; sınır koyma, ihtiyaç ifade etme ve kendine yönelik daha gerçekçi bir değerlendirme dili geliştirme üzerine adım adım çalışılır. Şema yaklaşımı ve bilişsel davranışçı yaklaşımın kavramları bu çalışmada sıklıkla kullanılır.

## Görüşme biçimi

Görüşmeler Ankara'da yüz yüze ya da online olarak sürdürülebilir.`,
    order_index: 6,
    featured: true,
    seo_title: "Özsaygı ve Kendilik Algısı Danışmanlığı | Ankara ve Online",
    seo_description:
      "Yoğun öz eleştiri, yetersizlik hissi ve onay ihtiyacı üzerine psikolojik danışmanlık. Ankara'da yüz yüze ve online görüşme seçenekleri.",
  },
];
